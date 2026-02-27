
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  function init() {
  // Inject cursor: none on all elements
  const style = document.createElement('style');
  style.textContent = '*, *::before, *::after { cursor: none !important; }';
  document.head.appendChild(style);

  // Create and mount the overlay canvas
  const cc = document.createElement('canvas');
  cc.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:2147483647;';
  document.body.appendChild(cc);
  const ctx = cc.getContext('2d');

  // ── Geometry ──────────────────────────────────────────────────────────────
  // hand2 outline — every 2nd point from the 93-point geometry
  const OUTLINE = [
    [637,557],[571,502],[530,462],[483,419],[441,375],[408,335],[378,291],[361,250],
    [447,279],[527,302],[610,320],[673,306],[690,263],[695,200],[734,190],[764,232],
    [789,277],[825,319],[872,281],[883,240],[908,197],[935,239],[938,283],[968,283],
    [966,241],[971,199],[1032,189],[1068,229],[1070,274],[1057,319],[1051,364],
    [1090,383],[1172,370],[1244,337],[1305,309],[1385,323],[1385,361],[1313,377],
    [1255,411],[1189,447],[1128,479],[1051,502],[971,524],[894,543],[811,554],
    [726,561],[640,561],
  ];

  // hand2 interior details — palm lines, thumbnail, finger lines
  const DETAILS = [
    [[480,400],[521,397],[563,390],[604,381],[654,371],[695,364],[739,357],[781,354],[822,354],[866,354],[908,360],[949,368],[990,375],[1032,382],[1073,386],[1117,386]],
    [[748,568],[748,542],[748,517],[750,497],[759,476],[775,457],[811,443],[850,434],[891,433],[935,434],[977,436],[1021,441],[1054,455],[1046,434],[1046,414],[1048,393]],
    [[726,559],[726,538],[726,514],[726,490],[723,468],[717,443],[714,422],[659,415],[607,415],[557,415],[508,418],[560,418],[626,412],[690,408],[737,406],[778,404],[819,403],[866,403],[913,403]],
    [[1321,367],[1319,346],[1360,342],[1393,354]],
    [[411,374],[458,360],[499,346],[532,331]],
    [[375,331],[403,314],[439,302]],
    [[610,226],[651,226],[695,228]],
    [[621,259],[662,259],[703,263]],
    [[828,255],[872,255],[913,254]],
    [[847,287],[888,287],[930,288]],
    [[954,247],[996,247]],
    [[960,286],[1001,286],[1043,288]],
  ];

  // hand2 erase shape — simplified silhouette used for white background fill
  const ERASE_SHAPE = [
    [788,530],[752,514],[720,494],[692,472],[664,452],[636,432],[608,412],[576,392],
    [548,372],[520,350],[496,328],[476,306],[452,284],[436,260],[488,268],[532,278],
    [580,284],[628,286],[676,290],[720,280],[756,260],[788,240],[820,262],[844,284],
    [868,306],[884,282],[904,260],[924,238],[940,262],[944,286],[948,310],[980,288],
    [1004,266],[1020,242],[1036,266],[1048,292],[1068,314],[1112,328],[1164,332],
    [1212,322],[1260,314],[1308,306],[1356,298],[1400,286],[1448,294],[1496,306],
    [1540,318],[1508,338],[1468,352],[1428,366],[1392,382],[1352,398],[1312,412],
    [1272,428],[1232,444],[1192,458],[1140,468],[1092,480],[1048,490],[1000,498],
    [952,504],[904,510],[856,518],[808,522],
  ];

  // Hotspot: leftmost point [361, 250] — where clicks register
  const HCX = 361, HCY = 250;
  // Scale to ~48px tall (hand2 bbox height: 561−178 = 383px)
  const HAND_SCALE = 35 / (561 - 178);

  // ── Canvas sizing ─────────────────────────────────────────────────────────
  const PR = window.devicePixelRatio || 1;

  function resizeCanvas() {
    cc.width  = window.innerWidth  * PR;
    cc.height = window.innerHeight * PR;
    cc.style.width  = window.innerWidth  + 'px';
    cc.style.height = window.innerHeight + 'px';
    ctx.scale(PR, PR);
  }
  resizeCanvas();

  // ── State ─────────────────────────────────────────────────────────────────
  let mx = -300, my = -300;
  let rotation = 0, targetRotation = 0;
  let rafId = null;

  // ── Draw ──────────────────────────────────────────────────────────────────
  function drawCursor() {
    ctx.clearRect(0, 0, cc.width, cc.height);

    // Pivot slightly inside the wrist so the tip swings naturally on click
    const pivotX = mx + 22, pivotY = my + 16;
    ctx.save();
    ctx.translate(pivotX, pivotY);
    ctx.rotate(rotation);
    ctx.translate(-pivotX, -pivotY);

    const t = ([px, py]) => [
      mx + (px - HCX) * HAND_SCALE,
      my + (py - HCY) * HAND_SCALE * 1.6,
    ];

    // White background — fill erase shape before outline
    ctx.beginPath();
    const eps = ERASE_SHAPE.map(t);
    ctx.moveTo(eps[0][0], eps[0][1]);
    for (let i = 1; i < eps.length; i++) ctx.lineTo(eps[i][0], eps[i][1]);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();

    // Outline — smooth closed path via midpoint quadratic bezier
    ctx.beginPath();
    const pts = OUTLINE.map(t);
    for (let i = 0; i < pts.length; i++) {
      const [ax, ay] = pts[i];
      const [bx, by] = pts[(i + 1) % pts.length];
      if (i === 0) ctx.moveTo((ax + bx) / 2, (ay + by) / 2);
      ctx.quadraticCurveTo(ax, ay, (ax + bx) / 2, (ay + by) / 2);
    }
    ctx.closePath();
    ctx.strokeStyle = '#080f15';
    ctx.lineWidth = 1.3;
    ctx.stroke();

    // Interior detail lines
    ctx.lineWidth = 0.65;
    for (const line of DETAILS) {
      const dpts = line.map(t);
      ctx.beginPath();
      ctx.moveTo(dpts[0][0], dpts[0][1]);
      for (let i = 1; i < dpts.length; i++) ctx.lineTo(dpts[i][0], dpts[i][1]);
      ctx.stroke();
    }

    ctx.restore();
  }

  // ── Click animation ───────────────────────────────────────────────────────
  function animate() {
    rotation += (targetRotation - rotation) * 0.16;
    drawCursor();
    if (Math.abs(targetRotation - rotation) > 0.001) {
      rafId = requestAnimationFrame(animate);
    } else {
      rotation = targetRotation;
      drawCursor();
      rafId = null;
    }
  }

  function startAnim() {
    if (!rafId) rafId = requestAnimationFrame(animate);
  }

  // ── Events ────────────────────────────────────────────────────────────────
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; drawCursor(); }, true);
  document.addEventListener('mousedown', () => { targetRotation = -0.32; startAnim(); });
  document.addEventListener('mouseup',   () => { targetRotation = 0;     startAnim(); });
  document.addEventListener('mouseleave', () => { ctx.clearRect(0, 0, cc.width, cc.height); });
  window.addEventListener('resize', () => { resizeCanvas(); drawCursor(); });

  // ── Iframe covers ─────────────────────────────────────────────────────────
  // Iframes steal mouse events from the parent document. We place a transparent
  // cover div over each one to intercept mousemove, then briefly disable it on
  // mousedown so the actual click still reaches the iframe.
  function coverIframe(iframe) {
    const cover = document.createElement('div');
    cover.style.cssText = 'position:fixed;z-index:99998;background:transparent;pointer-events:all;';

    function reposition() {
      const r = iframe.getBoundingClientRect();
      cover.style.top    = r.top    + 'px';
      cover.style.left   = r.left   + 'px';
      cover.style.width  = r.width  + 'px';
      cover.style.height = r.height + 'px';
    }
    reposition();

    cover.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; drawCursor(); });
    cover.addEventListener('mouseleave', () => drawCursor());
    cover.addEventListener('mousedown', () => {
      // Let the click pass through to the iframe
      cover.style.pointerEvents = 'none';
      setTimeout(() => { cover.style.pointerEvents = 'all'; }, 120);
      targetRotation = -0.32; startAnim();
    });
    cover.addEventListener('mouseup', () => { targetRotation = 0; startAnim(); });

    document.body.appendChild(cover);

    // Keep cover aligned on scroll or resize
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
  }

  // Cover iframes already in the DOM
  document.querySelectorAll('iframe').forEach(coverIframe);

  // Cover iframes added dynamically (e.g. lazy-loaded embeds)
  new MutationObserver(mutations => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.tagName === 'IFRAME') coverIframe(node);
        node.querySelectorAll?.('iframe').forEach(coverIframe);
      }
    }
  }).observe(document.body, { childList: true, subtree: true });
  } // end init

  window.addEventListener('sketch:done', init, { once: true });

})();