import * as brush from '@acamposuribe/brush';

// Create main canvas and load library, plus config brushes
// Physical pixel dimensions account for high-DPI screens
const pixelRatio = window.devicePixelRatio || 1;
let w = Math.floor(window.innerWidth  * pixelRatio);
let h = Math.floor(window.innerHeight * pixelRatio);
brush.createCanvas(w, h);

// canvasScale: ratio of physical canvas width to the 3000px reference design.
// Must use physical pixels (w), not logical (w/pixelRatio), because all drawing
// operates in physical pixel space. CSS display handles the pixelRatio correction
// automatically, so this keeps the composition proportionally identical on any
// screen size or device density.
const canvasScale = w / 3000;
brush.scaleBrushes(12 * canvasScale);

// COLORS — Le Corbusier Polychromie Architecturale (1931 + 1959 collections)
const bgPalette = [
  "#fdfdf8", // near white
  "#fffef0", // warm white
  "#fff8ec", // light cream
  "#fff1ce", // pale straw (LC)
  "#fffceb", // ivory (LC)
  "#f5f0e8", // warm paper
  "#f0f5f2", // pale mint
  "#eef3f7", // pale blue-grey
  "#f8f0ed", // pale blush
];
const palette = [
  // 1931 collection
  "#4e6498", 
  "#2c695a",  
"#9c2128",  "#811c35", 
  // 1959 collection
  "#a33a29",  "#de8da0", "#69372b", "#080f15",
  "#a4aa35", "#559778",   "#395a8e",
 "#6c2b3b", "#7facc6", 
  "#333230", "#d15c32", "#0e2d58",  "#f4bd48","#f4bd48","#f4bd48",
];
const brushTypes = ["HB", "HB", "2B", "cpencil", "cpencil", "charcoal"];

const bgColor = brush.random(bgPalette);

// Le Corbusier's Open Hand monument — hand-traced contour (Chandigarh)
const hand1 = [
  [1319, 636],
  [1300, 647],
  [1277, 660],
  [1249, 671],
  [1222, 683],
  [1190, 692],
  [1165, 702],
  [1140, 711],
  [1117, 718],
  [1089, 725],
  [1062, 734],
  [1039, 741],
  [1014, 748],
  [986, 755],
  [963, 762],
  [938, 768],
  [902, 773],
  [871, 776],
  [843, 779],
  [814, 782],
  [782, 783],
  [751, 786],
  [719, 787],
  [694, 789],
  [669, 784],
  [644, 779],
  [620, 770],
  [595, 759],
  [572, 751],
  [549, 739],
  [528, 727],
  [509, 714],
  [488, 697],
  [471, 682],
  [454, 667],
  [444, 651],
  [433, 634],
  [425, 618],
  [414, 602],
  [404, 583],
  [400, 564],
  [391, 546],
  [385, 527],
  [383, 504],
  [381, 487],
  [383, 471],
  [383, 452],
  [383, 436],
  [383, 419],
  [381, 402],
  [376, 385],
  [370, 367],
  [366, 350],
  [364, 333],
  [366, 315],
  [368, 298],
  [381, 282],
  [404, 275],
  [431, 275],
  [454, 282],
  [475, 291],
  [494, 303],
  [513, 318],
  [530, 331],
  [549, 342],
  [568, 353],
  [589, 363],
  [612, 371],
  [637, 378],
  [662, 385],
  [688, 389],
  [715, 391],
  [740, 391],
  [766, 385],
  [787, 375],
  [808, 366],
  [824, 353],
  [833, 335],
  [839, 318],
  [848, 300],
  [852, 279],
  [860, 258],
  [869, 235],
  [873, 217],
  [875, 200],
  [877, 183],
  [879, 165],
  [881, 147],
  [885, 130],
  [900, 115],
  [917, 102],
  [942, 101],
  [955, 116],
  [957, 133],
  [957, 150],
  [963, 167],
  [980, 179],
  [991, 164],
  [993, 147],
  [991, 129],
  [1001, 113],
  [1016, 99],
  [1041, 94],
  [1070, 101],
  [1081, 116],
  [1081, 133],
  [1081, 150],
  [1085, 167],
  [1110, 171],
  [1125, 157],
  [1129, 140],
  [1123, 123],
  [1125, 106],
  [1140, 92],
  [1167, 83],
  [1192, 85],
  [1205, 101],
  [1205, 118],
  [1205, 134],
  [1205, 153],
  [1205, 174],
  [1209, 195],
  [1209, 211],
  [1213, 232],
  [1213, 251],
  [1213, 269],
  [1213, 289],
  [1216, 307],
  [1216, 324],
  [1216, 340],
  [1216, 359],
  [1216, 375],
  [1216, 392],
  [1218, 409],
  [1218, 427],
  [1218, 445],
  [1220, 462],
  [1232, 479],
  [1258, 480],
  [1283, 480],
  [1310, 476],
  [1338, 471],
  [1363, 464],
  [1386, 455],
  [1409, 448],
  [1430, 437],
  [1453, 430],
  [1476, 420],
  [1499, 412],
  [1529, 409],
  [1554, 409],
  [1581, 412],
  [1607, 417],
  [1632, 423],
  [1659, 429],
  [1682, 436],
  [1706, 445],
  [1729, 455],
  [1750, 466],
  [1767, 479],
  [1783, 492],
  [1796, 507],
  [1800, 525],
  [1783, 541],
  [1760, 548],
  [1735, 550],
  [1710, 552],
  [1685, 550],
  [1659, 550],
  [1634, 550],
  [1605, 550],
  [1579, 550],
  [1554, 553],
  [1529, 559],
  [1506, 566],
  [1481, 574],
  [1455, 580],
  [1432, 587],
  [1409, 597],
  [1388, 606],
  [1365, 615],
  [1342, 623],
  [1321, 633],
];

// Le Corbusier's Open Hand — second drawing (x: 361–1401, y: 178–561)
const hand2 = [
  [637, 557],
  [604, 531],
  [571, 502],
  [552, 481],
  [530, 462],
  [508, 441],
  [483, 419],
  [463, 396],
  [441, 375],
  [422, 356],
  [408, 335],
  [394, 314],
  [378, 291],
  [367, 270],
  [361, 250],
  [408, 268],
  [447, 279],
  [486, 290],
  [527, 302],
  [568, 313],
  [610, 320],
  [651, 327],
  [673, 306],
  [684, 284],
  [690, 263],
  [695, 229],
  [695, 200],
  [698, 178],
  [734, 190],
  [750, 211],
  [764, 232],
  [778, 254],
  [789, 277],
  [803, 299],
  [825, 319],
  [861, 303],
  [872, 281],
  [877, 261],
  [883, 240],
  [891, 218],
  [908, 197],
  [930, 218],
  [935, 239],
  [935, 261],
  [938, 283],
  [952, 303],
  [968, 283],
  [968, 262],
  [966, 241],
  [966, 221],
  [971, 199],
  [993, 181],
  [1032, 189],
  [1059, 208],
  [1068, 229],
  [1070, 251],
  [1070, 274],
  [1062, 295],
  [1057, 319],
  [1051, 342],
  [1051, 364],
  [1043, 385],
  [1090, 383],
  [1131, 378],
  [1172, 370],
  [1219, 356],
  [1244, 337],
  [1266, 319],
  [1305, 309],
  [1349, 312],
  [1385, 323],
  [1401, 342],
  [1385, 361],
  [1343, 361],
  [1313, 377],
  [1288, 393],
  [1255, 411],
  [1225, 428],
  [1189, 447],
  [1159, 463],
  [1128, 479],
  [1092, 491],
  [1051, 502],
  [1010, 514],
  [971, 524],
  [932, 535],
  [894, 543],
  [852, 550],
  [811, 554],
  [767, 559],
  [726, 561],
  [681, 561],
  [640, 561],
];

// Hand2 interior details
const hand2PalmLine1 = [
  [480, 400], [521, 397], [563, 390], [604, 381], [654, 371],
  [695, 364], [739, 357], [781, 354], [822, 354], [866, 354],
  [908, 360], [949, 368], [990, 375], [1032, 382], [1073, 386], [1117, 386],
];
const hand2PalmLine2 = [
  [748, 568], [748, 542], [748, 517], [750, 497], [759, 476],
  [775, 457], [811, 443], [850, 434], [891, 433], [935, 434],
  [977, 436], [1021, 441], [1054, 455], [1046, 434], [1046, 414], [1048, 393],
];
const hand2PalmLine3 = [
  [726, 559], [726, 538], [726, 514], [726, 490], [723, 468],
  [717, 443], [714, 422], [659, 415], [607, 415], [557, 415],
  [508, 418], [560, 418], [626, 412], [690, 408], [737, 406],
  [778, 404], [819, 403], [866, 403], [913, 403],
];
const hand2ThumbNail = [
  [1321, 367], [1319, 346], [1360, 342], [1393, 354],
];
const hand2FingerLine1 = [[411, 374], [458, 360], [499, 346], [532, 331]];
const hand2FingerLine2 = [[375, 331], [403, 314], [439, 302]];
const hand2FingerLine3 = [[610, 226], [651, 226], [695, 228]];
const hand2FingerLine4 = [[621, 259], [662, 259], [703, 263]];
const hand2FingerLine5 = [[828, 255], [872, 255], [913, 254]];
const hand2FingerLine6 = [[847, 287], [888, 287], [930, 288]];
const hand2FingerLine7 = [[954, 247], [996, 247]];
const hand2FingerLine8 = [[960, 286], [1001, 286], [1043, 288]];

// Interior detail — palm line 1
const palmLine1 = [
  [429, 525],
  [454, 521],
  [479, 514],
  [505, 507],
  [530, 501],
  [555, 493],
  [583, 486],
  [606, 479],
  [635, 472],
  [660, 468],
  [686, 462],
  [715, 459],
  [740, 455],
  [766, 450],
  [791, 447],
  [816, 444],
  [843, 443],
  [871, 440],
  [896, 438],
  [921, 438],
  [946, 438],
  [976, 440],
  [1001, 443],
  [1026, 444],
  [1052, 447],
  [1077, 450],
  [1102, 452],
  [1127, 455],
  [1152, 458],
  [1178, 462],
  [1205, 466],
  [1230, 471],
];

// Interior detail — palm line 2
const palmLine2 = [
  [1039, 732],
  [1014, 738],
  [988, 742],
  [963, 745],
  [938, 748],
  [913, 742],
  [885, 731],
  [866, 718],
  [852, 704],
  [839, 689],
  [831, 672],
  [829, 655],
  [831, 636],
  [835, 619],
  [845, 602],
  [860, 587],
  [881, 577],
  [904, 569],
  [927, 560],
  [951, 553],
  [976, 548],
  [1001, 543],
  [1026, 541],
  [1052, 541],
  [1077, 541],
  [1102, 543],
  [1127, 549],
  [1150, 556],
  [1174, 564],
  [1192, 576],
  [1188, 559],
  [1190, 542],
  [1190, 525],
  [1190, 508],
  [1190, 486],
  [1195, 469],
  [1199, 452],
  [1201, 436],
  [1201, 419],
  [1203, 402],
  [1205, 385],
  [1205, 364],
  [1207, 346],
];

// Interior detail — palm line 3
const palmLine3 = [
  [753, 779],
  [749, 762],
  [749, 745],
  [744, 728],
  [744, 711],
  [744, 695],
  [744, 678],
  [742, 661],
  [740, 643],
  [740, 625],
  [738, 606],
  [738, 590],
  [740, 573],
  [740, 556],
  [715, 553],
  [688, 555],
  [658, 555],
  [633, 555],
  [606, 555],
  [580, 555],
  [555, 555],
  [530, 555],
  [503, 555],
  [477, 555],
  [452, 559],
  [479, 557],
  [513, 556],
  [538, 553],
  [570, 552],
  [595, 550],
  [620, 550],
  [646, 549],
  [675, 549],
  [702, 548],
  [728, 546],
  [753, 545],
  [778, 542],
  [805, 541],
  [831, 538],
  [856, 536],
  [881, 534],
  [911, 534],
  [936, 532],
  [961, 531],
  [986, 529],
  [1012, 527],
  [1039, 525],
  [1064, 522],
];

// Interior detail — thumb nail (closed shape)
const thumbNail = [
  [1529, 541],
  [1518, 525],
  [1514, 507],
  [1516, 490],
  [1523, 473],
  [1552, 475],
  [1577, 480],
  [1600, 489],
  [1624, 496],
  [1640, 508],
  [1632, 525],
  [1607, 528],
  [1579, 531],
  [1554, 534],
];

// Finger detail lines
const fingerLine1 = [[877, 235], [904, 231], [930, 228], [955, 227]];
const fingerLine2 = [[1066, 223], [1091, 221], [1117, 218], [1142, 217]];
const fingerLine3 = [[980, 297], [1016, 297], [1047, 297]];
const fingerLine4 = [[875, 370], [906, 368], [932, 366], [957, 364]];
const fingerLine5 = [[1070, 359], [1096, 356], [1121, 354], [1146, 352]];

// Bounding-box centers per shape
const hand1CX = 1082, hand1CY = 436; // x: 364–1800, y: 83–789
const hand2CX = 881,  hand2CY = 370; // x: 361–1401, y: 178–561

// Translate, scale, rotate, and jitter a point array relative to the geometry center.
// cx/cy are the shape's bounding-box center; cos/sin are pre-computed.
function transformPoints(pts, x, y, scale, jitter, cos, sin, cx, cy) {
  return pts.map(([px, py]) => {
    const j = py < cy - 80
      ? jitter * 0.4                      // fingers: less jitter
      : jitter * brush.random(1.0, 3.0);  // palm + lower: much more
    const tx = (px - cx) * scale + brush.random(-j, j);
    const ty = (py - cy) * scale * 1.5 + brush.random(-j, j);
    return [
      x + cos * tx - sin * ty,
      y + sin * tx + cos * ty,
    ];
  });
}

function drawHand(x = hand1CX, y = hand1CY, scale = 1, full = false) {
  const jitter = brush.random(1, 5) * scale;

  // Pick which hand shape to draw (full = always hand1)
  const useHand1 = full || brush.random(1) > 0.5;
  const outline  = useHand1 ? hand1 : hand2;
  const cx       = useHand1 ? hand1CX : hand2CX;
  const cy       = useHand1 ? hand1CY : hand2CY;

  // Random rotation ±60°, pre-compute cos/sin once for all transforms
  const rotation = brush.random(-Math.PI / 7, Math.PI / 7);
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);

  brush.wiggle(brush.random(0.1, 3));

  // One brush type per hand
  const handBrush = brush.random(brushTypes);

  // Two independent colors: one for fill, one for outline/interior
  const outlineColor = brush.random(palette);
  let fillColor = brush.random(palette);
  while (fillColor === outlineColor) fillColor = brush.random(palette);

  // Transform outline + all interior point arrays for the chosen hand
  const h = transformPoints(outline, x, y, scale, jitter * 0.3, cos, sin, cx, cy);
  const tp = (pts) => transformPoints(pts, x, y, scale, jitter, cos, sin, cx, cy);
  let interiors;
  if (useHand1) {
    interiors = [
      [palmLine1,        0.15],
      [palmLine2,        0.3],
      [palmLine3,        0.3],
      [thumbNail,        0.4],
      [fingerLine1,      0.45],
      [fingerLine2,      0.45],
      [fingerLine3,      0.45],
      [fingerLine4,      0.45],
      [fingerLine5,      0.45],
    ];
  } else {
    interiors = [
      [hand2PalmLine1,   0.15],
      [hand2PalmLine2,   0.3],
      [hand2PalmLine3,   0.3],
      [hand2ThumbNail,   0.4],
      [hand2FingerLine1, 0.45],
      [hand2FingerLine2, 0.45],
      [hand2FingerLine3, 0.45],
      [hand2FingerLine4, 0.45],
      [hand2FingerLine5, 0.45],
      [hand2FingerLine6, 0.45],
      [hand2FingerLine7, 0.45],
      [hand2FingerLine8, 0.45],
    ];
  }

  // Fill shape: displaced, ~1/3 of points kept, extra distortion, also rotated
  const dispMag = brush.random(2, 6);
  const fillDX = brush.random(-20, 20) * scale * dispMag;
  const fillDY = brush.random(-20, 20) * scale * dispMag;
  const fillJitter = jitter * 2.5;
  const hFill = outline
    .filter((_, i) => i === 0 || i === outline.length - 1 || brush.random(1) > 0.75)
    .map(([px, py]) => {
      const tx = (px - cx) * scale + brush.random(-fillJitter, fillJitter);
      const ty = (py - cy) * scale * 1.5 + brush.random(-fillJitter, fillJitter);
      return [
        x + fillDX + cos * tx - sin * ty,
        y + fillDY + sin * tx + cos * ty,
      ];
    });

  // Mutually exclusive: a hand either fills or hatches, never both
  const doFill  = brush.random(1) > 0.75;
  const doErase = !doFill && brush.random(1) > 0.2;
  const doHatch = !doFill && brush.random(1) > 0.75;

  const displacedPol = new brush.Polygon(hFill); // fill / erase only
  const normalPol    = new brush.Polygon(h);     // hatch + outline

  // 1. Fill or erase the displaced polygon
  if (doFill) {
        brush.erase(bgColor, 255);
    displacedPol.erase();
    brush.noErase();
    brush.fillStyle(fillColor, 100);
    brush.fillBleed(brush.random(0.05, 0.15));
    brush.fillTexture(brush.random(0.1, 0.4), 0.4);
    displacedPol.fill();
    brush.noFill();
  } else if (doErase) {
    brush.erase(bgColor, 255);
    brush.spline(hFill, 0.25);
    brush.noErase();
  }

  // 2. Hatch the normal polygon (outlineColor)
  if (doHatch) {
    brush.hatch(19 * canvasScale, brush.random(-Math.PI / 2, 0), { rand: 0.15, continuous: true, gradient: brush.random(0.1,0.5) });
    brush.hatchStyle(handBrush, outlineColor, 1);
    brush.spline(h, 1)
    brush.noHatch();

    // And now erase the noirmal polygon
    brush.erase(fillColor, 80);
    displacedPol.erase();
    brush.noErase();
  }

  // 3. Outline the normal polygon (outlineColor)
  brush.set(handBrush, outlineColor, 1);
  brush.spline(h, 1)

  // 4. Interior lines — each randomly included
  for (const [pts, threshold] of interiors) {
    if (full || brush.random(1) > threshold) brush.spline(tp(pts), 0.5);
  }

  // Sometimes hatch interior details
  if (doHatch && brush.random(0,1) > 0.35) {
    brush.hatch(10 * canvasScale, brush.random(-Math.PI / 2, 0), { rand: 0.15, continuous: true, gradient: brush.random(0.1,0.5) });
    brush.hatchStyle(handBrush, outlineColor, 1);
    for (const [pts, threshold] of interiors) {
      if (full || brush.random(1) > threshold) {
        const pol = new brush.Polygon(tp(pts));
        pol.hatch();
      }
    }
    brush.noHatch();
  }
  

  brush.noField();
}

// Bounding-circle radius at scale 1, accounting for the 1.5× y-stretch in transformPoints.
// hand1 bbox: 1436 × (706 × 1.5) → half-diagonal ≈ 892
const HAND_RADIUS = Math.sqrt((1436 * 0.5) ** 2 + (706 * 1.5 * 0.5) ** 2);

// Scale-aware Poisson sampling.
// Uses 0.7 × sum-of-radii: allows slight touching at edges but prevents heavy overlap.
// Full non-overlap (× 1.0) is geometrically impossible for 15 variable-size hands on most screens.
function poissonSample(n, scales, width, height, maxAttempts = 80) {
  const points = [];
  for (let i = 0; i < n; i++) {
    let best = null;
    let bestScore = -Infinity;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const x = brush.random(width * 0.05, width * 0.95);
      const y = brush.random(height * 0.05, height * 0.95);
      let score = Infinity;
      for (let j = 0; j < points.length; j++) {
        const required = (HAND_RADIUS * scales[i] + HAND_RADIUS * scales[j]) * 0.7;
        score = Math.min(score, Math.hypot(x - points[j][0], y - points[j][1]) - required);
      }
      if (score >= 0) { best = [x, y]; break; }
      if (score > bestScore) { bestScore = score; best = [x, y]; }
    }
    points.push(best);
  }
  return points;
}

const MAX_HANDS = 15;
const handScales = Array.from({length: MAX_HANDS}, () => brush.random(0.25, 0.55) * canvasScale);
const positions = poissonSample(MAX_HANDS, handScales, w, h);
let handCount = 0;

brush.background(bgColor);

// Background polygonal shapes — drawn once, behind all hands
function drawBackgroundShapes() {
  // Pick 2–3 colors once and reuse across all shapes for a coherent palette
  const colorCount  = Math.floor(brush.random(2, 4));
  const shapeColors = [];
  const usedSet     = new Set();
  while (shapeColors.length < colorCount) {
    const c = brush.random(palette);
    if (!usedSet.has(c)) { usedSet.add(c); shapeColors.push(c); }
  }

  // Insert interpolated points every ~step px along each edge of a closed polygon
  const subdivide = (pts, step = 40) => {
    const result = [];
    for (let i = 0; i < pts.length; i++) {
      const [x1, y1] = pts[i];
      const [x2, y2] = pts[(i + 1) % pts.length];
      const n = Math.max(1, Math.ceil(Math.hypot(x2 - x1, y2 - y1) / step));
      for (let t = 0; t < n; t++) {
        result.push([x1 + (x2 - x1) * (t / n), y1 + (y2 - y1) * (t / n)]);
      }
    }
    return result;
  };

  // Shape makers — centered at (cx, cy)
  const makeRect = (cx, cy) => {
    const rw = w * brush.random(0.15, 0.60);
    const rh = h * brush.random(0.17, 0.65);
    const x = cx - rw / 2, y = cy - rh / 2;
    return { curved: false, pts: subdivide([[x,y],[x+rw,y],[x+rw,y+rh],[x,y+rh]]) };
  };
  const makeBlob = (cx, cy) => {
    const rx = w * brush.random(0.02, 0.14);
    const ry = h * brush.random(0.03, 0.14);
    return { curved: true, pts: Array.from({length: 8}, (_, i) => {
      const a = (i / 8) * Math.PI * 2;
      return [cx + Math.cos(a)*rx*brush.random(0.7,1.3), cy + Math.sin(a)*ry*brush.random(0.7,1.3)];
    })};
  };
  const makers = [makeRect, makeRect, makeRect, makeBlob, makeBlob];
  const randomMaker = () => makers[Math.floor(brush.random(makers.length))];

  // --- Build position list ---
  const centers = []; // [cx, cy] for all shapes

  // 1. One tight cluster of 2–3 shapes
  const clusterSize   = Math.floor(brush.random(2, 3));
  const clusterCX     = brush.random(w * 0.15, w * 0.85);
  const clusterCY     = brush.random(h * 0.15, h * 0.85);
  const clusterSpread = Math.min(w, h) * 0.26;
  for (let i = 0; i < clusterSize; i++) {
    centers.push([
      clusterCX + brush.random(-clusterSpread, clusterSpread),
      clusterCY + brush.random(-clusterSpread, clusterSpread),
    ]);
  }

  // 2. Remaining shapes Poisson-distributed away from each other and the cluster
  const freeCount = Math.floor(brush.random(2, 6));
  const MIN_DIST  = Math.min(w, h) * 0.35;
  for (let i = 0; i < freeCount; i++) {
    let best = null, bestScore = -Infinity;
    for (let attempt = 0; attempt < 60; attempt++) {
      const cx = brush.random(- w * 0.05, w * 1.05);
      const cy = brush.random(- h * 0.05, h * 1.05);
      let score = Infinity;
      for (const [ax, ay] of centers) score = Math.min(score, Math.hypot(cx-ax, cy-ay) - MIN_DIST);
      if (score >= 0) { best = [cx, cy]; break; }
      if (score > bestScore) { bestScore = score; best = [cx, cy]; }
    }
    centers.push(best);
  }

  // --- Draw all shapes ---
  for (const [cx, cy] of centers) {
    const shape = randomMaker()(cx, cy);

    const color = brush.random(shapeColors);

    function drawShape () {
      const curvature = shape.curved ? brush.random(0.6, 1) : 0;
      brush.beginPath(curvature);
      brush.moveTo(shape.pts[0][0], shape.pts[0][1]);
      for (let j = 1; j < shape.pts.length; j++) brush.lineTo(shape.pts[j][0], shape.pts[j][1]);
      brush.closePath();
      brush.endPath();
    }


brush.noStroke();

    let filling = brush.random(1) > 0.5;


    brush.erase(bgColor, 100);
    if (!filling) {
      brush.erase(color, 100);
    }
    drawShape();
    brush.noErase();
    brush.draw();

    

    if (filling) {
      brush.fillStyle(color, 150);
      brush.fillBleed(0.05);
      brush.fillTexture(0.1, 0.15);
    }

    
    brush.hatch(40 * canvasScale,0);
    brush.hatchStyle("spray", color, 3);
    drawShape();
    brush.noFill();
    brush.noHatch();

    brush.draw();
  }
}

brush.wiggle(1)

drawBackgroundShapes();

function drawTexture() {
  brush.save()
  brush.set("spray", "#d28b7a", 30 * canvasScale)
  const divide = 15;
  for (let i = 0; i < divide; i++) {
    brush.line(-50, i * (h / divide), w + 50, i * (h / divide));
  }
  brush.restore()
}

brush.wiggle(0)


brush.draw();

const draw = () => {
  if (handCount >= MAX_HANDS) { brush.noLoop(); return; }
  const [x, y] = positions[handCount];
  const isLast = handCount === MAX_HANDS - 1;
  handCount++;
  drawHand(x, y, handScales[handCount - 1], isLast);

  if (handCount -1 === 0) drawTexture();
};

brush.frameRate(5);
brush.loop(draw);