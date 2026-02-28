
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  // ── Config ────────────────────────────────────────────────────────────────
  const HAND_SIZE        = 25;       // px tall (approximate)
  const HAND_Y_STRETCH   = 1.6;      // vertical stretch factor
  const PIVOT_OFFSET_X   = 22;       // px — pivot point from hotspot X
  const PIVOT_OFFSET_Y   = 16;       // px — pivot point from hotspot Y
  const WAVE_AMPLITUDE   = 0.4;      // radians — peak swing of the wave
  const WAVE_FREQ        = 18;       // rad/s — oscillation speed (~3 swings/s)
  const WAVE_DECAY       = 5;        // exponential decay rate
  const OUTLINE_WIDTH    = 1.3;      // px — outer stroke
  const DETAIL_WIDTH     = 0.65;     // px — interior lines stroke
  const COLOR_INK        = '#080f15';
  const GREETINGS        = ['HOLA', 'HELLO', 'BON DIA'];
  const GREET_R          = 40;       // px — distance from hotspot
  const GREET_DURATION   = 1000;      // ms — how long greeting stays visible
  const GREET_FONT       = 'bold 13px monospace';
  const GREET_PAD_X      = 4;        // px — horizontal padding on background rect
  const GREET_BG_HEIGHT  = 14;       // px — background rect height

  function init() {
  // Inject cursor: none on all elements
  const style = document.createElement('style');
  style.textContent = '*, *::before, *::after { cursor: none !important; }';
  document.head.appendChild(style);
  // Secondary style used to temporarily restore pointer cursor over iframe buttons
  const cursorOverride = document.createElement('style');
  document.head.appendChild(cursorOverride);

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

  // Hotspot: bbox center of the outline — where clicks register
  const HCX = 873, HCY = 375;
  // Scale based on HAND_SIZE (hand2 bbox height: 561−178 = 383px)
  const HAND_SCALE = HAND_SIZE / (561 - 178);

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
  let rotation = 0;
  let rafId = null;
  let waveStart = null;
  let greetAngle = 0;
  let greeting = null;
  let greetTimerId = null;
  let mouseInWindow = false;
  let cursorSuppressed = false;
  let drawScheduled = false;

  // ── Draw ──────────────────────────────────────────────────────────────────
  // Throttle mouse-driven redraws to one per animation frame.
  // The wave animation's own rAF loop calls drawCursor() directly, so we skip
  // scheduling when it's already running to avoid double-draws.
  function scheduleDraw() {
    if (drawScheduled || rafId) return;
    drawScheduled = true;
    requestAnimationFrame(() => { drawScheduled = false; drawCursor(); });
  }

  function drawCursor() {
    if (cursorSuppressed) return;
    ctx.clearRect(0, 0, cc.width, cc.height);

    // Pivot slightly inside the wrist so the tip swings naturally on click
    const pivotX = mx + PIVOT_OFFSET_X, pivotY = my + PIVOT_OFFSET_Y;
    ctx.save();
    ctx.translate(pivotX, pivotY);
    ctx.rotate(rotation);
    ctx.translate(-pivotX, -pivotY);

    const t = ([px, py]) => [
      mx + (px - HCX) * HAND_SCALE,
      my + (py - HCY) * HAND_SCALE * HAND_Y_STRETCH,
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
    ctx.strokeStyle = COLOR_INK;
    ctx.lineWidth = OUTLINE_WIDTH;
    ctx.stroke();

    // Interior detail lines
    ctx.lineWidth = DETAIL_WIDTH;
    for (const line of DETAILS) {
      const dpts = line.map(t);
      ctx.beginPath();
      ctx.moveTo(dpts[0][0], dpts[0][1]);
      for (let i = 1; i < dpts.length; i++) ctx.lineTo(dpts[i][0], dpts[i][1]);
      ctx.stroke();
    }

    ctx.restore();

    // Greeting text — outside the tilt transform so it stays upright
    if (greeting) {
      const tx = mx + GREET_R * Math.cos(greetAngle);
      const ty = my + GREET_R * Math.sin(greetAngle);
      // Perpendicular to radius; flip 180° when text would be upside-down (below hotspot)
      const textRot = greetAngle + Math.PI / 2 + (Math.sin(greetAngle) > 0 ? Math.PI : 0);
      ctx.save();
      ctx.translate(tx, ty);
      ctx.rotate(textRot);
      ctx.font = GREET_FONT;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const m = ctx.measureText(greeting);
      // Visual glyph center (offset from em-square midpoint used by textBaseline=middle)
      const glyphMidY = (m.actualBoundingBoxDescent - m.actualBoundingBoxAscent) / 2;
      ctx.fillStyle = 'white';
      ctx.fillRect(-m.width / 2 - GREET_PAD_X, glyphMidY - GREET_BG_HEIGHT / 2, m.width + GREET_PAD_X * 2, GREET_BG_HEIGHT);
      ctx.fillStyle = COLOR_INK;
      ctx.fillText(greeting, 0, 0);
      ctx.restore();
    }
  }

  // ── Wave animation ────────────────────────────────────────────────────────
  function animate() {
    const t = (performance.now() - waveStart) / 1000;
    const amp = WAVE_AMPLITUDE * Math.exp(-WAVE_DECAY * t);
    rotation = amp * Math.sin(WAVE_FREQ * t);
    drawCursor();
    if (amp > 0.002) {
      rafId = requestAnimationFrame(animate);
    } else {
      rotation = 0;
      drawCursor();
      rafId = null;
      waveStart = null;
    }
  }

  function startWave() {
    waveStart = performance.now();
    if (!rafId) rafId = requestAnimationFrame(animate);
  }

  // ── Events ────────────────────────────────────────────────────────────────
  document.addEventListener('mousemove', e => { mouseInWindow = true; mx = e.clientX; my = e.clientY; scheduleDraw(); }, true);
  document.addEventListener('mousedown', () => {
    greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    greetAngle = Math.random() * Math.PI * 2;
    if (greetTimerId) { clearTimeout(greetTimerId); greetTimerId = null; }
    startWave();
  });
  document.addEventListener('mouseup', () => {
    if (greetTimerId) clearTimeout(greetTimerId);
    greetTimerId = setTimeout(() => { greeting = null; greetTimerId = null; drawCursor(); }, GREET_DURATION);
  });
  document.addEventListener('mouseleave', () => {
    mouseInWindow = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; waveStart = null; rotation = 0; }
    ctx.clearRect(0, 0, cc.width, cc.height);
  });
  window.addEventListener('resize', () => { resizeCanvas(); drawCursor(); });

  // ── Sketch buttons (download / reload) ───────────────────────────────────
  // A safe zone div wraps both buttons. Cursor suppression is managed on the
  // zone so the full area — including the gap between buttons and padding —
  // switches to pointer in one clean step.
  const stroke = window.DPA_IS_DARK ? 'white' : '#080f15';
  const shadow = window.DPA_IS_DARK ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)';

  // Zone: top-left corner with 12px padding around the buttons.
  // Buttons sit at absolute top:12, left:12 and left:56 inside it.
  const safeZone = document.createElement('div');
  safeZone.style.cssText = 'position:fixed;top:8px;left:8px;width:90px;height:46px;z-index:2147483646;';
  safeZone.addEventListener('pointerenter', () => {
    cursorSuppressed = true;
    ctx.clearRect(0, 0, cc.width, cc.height);
    cursorOverride.textContent = '*, *::before, *::after { cursor: pointer !important; }';
  });
  safeZone.addEventListener('pointerleave', () => {
    cursorSuppressed = false;
    cursorOverride.textContent = '';
    drawCursor();
  });
  document.body.appendChild(safeZone);

  const svgIcon = (paths) =>
    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

  const makeBtn = (svg, title, left, onClick) => {
    const btn = document.createElement('button');
    btn.title = title;
    btn.style.cssText = `position:absolute;top:12px;left:${left}px;background:transparent;border:none;display:flex;align-items:center;justify-content:center;padding:0;opacity:0.7;transition:opacity 0.15s;filter:drop-shadow(0 1px 4px ${shadow});`;
    btn.innerHTML = svg;
    btn.addEventListener('pointerover', () => { btn.style.opacity = '1'; });
    btn.addEventListener('pointerout',  () => { btn.style.opacity = '0.7'; });
    btn.addEventListener('click', e => { e.stopPropagation(); onClick(); });
    safeZone.appendChild(btn);
  };

  makeBtn(
    svgIcon('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'),
    'Download', 12,
    () => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return;
      const a = document.createElement('a');
      a.download = `DPA#1_${window.DPA_SEED ?? ''}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    }
  );

  makeBtn(
    svgIcon('<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .87-8.19"/>'),
    'Reload', 56,
    () => window.location.reload()
  );

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

    cover.addEventListener('mousemove', e => { if (cursorSuppressed) return; mouseInWindow = true; mx = e.clientX; my = e.clientY; drawCursor(); });
    cover.addEventListener('mouseleave', () => { ctx.clearRect(0, 0, cc.width, cc.height); });
    cover.addEventListener('mousedown', () => {
      cover.style.pointerEvents = 'none';
      setTimeout(() => { cover.style.pointerEvents = 'all'; }, 120);
      startWave();
    });
    cover.addEventListener('mouseup', () => {});

    document.body.appendChild(cover);
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