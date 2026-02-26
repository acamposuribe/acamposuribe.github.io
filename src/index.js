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
const canvasScale = Math.min(w, h) / 3000;
brush.scaleBrushes(10 * canvasScale);

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

// Erase shape for hand1
const hand1EraseShape = [
  [1864, 488],
  [1838, 500],
  [1810, 509],
  [1781, 519],
  [1755, 531],
  [1729, 543],
  [1703, 557],
  [1677, 569],
  [1648, 582],
  [1619, 594],
  [1591, 606],
  [1559, 616],
  [1531, 627],
  [1499, 639],
  [1468, 649],
  [1439, 658],
  [1411, 668],
  [1382, 677],
  [1351, 686],
  [1317, 694],
  [1286, 701],
  [1254, 707],
  [1220, 714],
  [1189, 720],
  [1158, 726],
  [1126, 731],
  [1090, 740],
  [1056, 745],
  [1025, 748],
  [991, 752],
  [957, 755],
  [923, 759],
  [892, 766],
  [855, 771],
  [824, 776],
  [790, 780],
  [759, 780],
  [725, 780],
  [694, 780],
  [662, 771],
  [636, 755],
  [615, 726],
  [597, 700],
  [574, 660],
  [561, 637],
  [548, 611],
  [535, 587],
  [524, 561],
  [514, 538],
  [506, 516],
  [493, 488],
  [475, 450],
  [454, 408],
  [433, 368],
  [420, 333],
  [407, 306],
  [396, 283],
  [383, 262],
  [375, 241],
  [362, 220],
  [349, 201],
  [378, 212],
  [407, 222],
  [435, 234],
  [464, 243],
  [493, 252],
  [522, 260],
  [550, 269],
  [581, 278],
  [613, 285],
  [641, 293],
  [670, 302],
  [699, 311],
  [730, 319],
  [759, 328],
  [787, 340],
  [803, 321],
  [821, 302],
  [845, 281],
  [866, 262],
  [889, 241],
  [910, 222],
  [931, 203],
  [954, 186],
  [973, 168],
  [986, 188],
  [986, 208],
  [986, 231],
  [988, 252],
  [991, 273],
  [999, 293],
  [1012, 274],
  [1022, 252],
  [1040, 234],
  [1064, 210],
  [1077, 191],
  [1080, 215],
  [1080, 236],
  [1080, 260],
  [1085, 285],
  [1090, 307],
  [1113, 293],
  [1124, 271],
  [1140, 250],
  [1150, 229],
  [1163, 205],
  [1173, 184],
  [1181, 205],
  [1186, 226],
  [1197, 248],
  [1202, 269],
  [1210, 295],
  [1215, 316],
  [1220, 337],
  [1228, 359],
  [1231, 380],
  [1236, 401],
  [1239, 422],
  [1244, 443],
  [1249, 464],
  [1254, 484],
  [1278, 470],
  [1304, 458],
  [1335, 446],
  [1372, 432],
  [1400, 420],
  [1432, 408],
  [1458, 396],
  [1484, 384],
  [1518, 385],
  [1549, 396],
  [1578, 405],
  [1606, 413],
  [1635, 422],
  [1666, 431],
  [1695, 441],
  [1724, 453],
  [1752, 465],
  [1781, 476],
  [1812, 483],
  [1836, 497],
];

// Erase shape for hand2
const hand2EraseShape = [
  [788, 530],
  [752, 514],
  [720, 494],
  [692, 472],
  [664, 452],
  [636, 432],
  [608, 412],
  [576, 392],
  [548, 372],
  [520, 350],
  [496, 328],
  [476, 306],
  [452, 284],
  [436, 260],
  [488, 268],
  [532, 278],
  [580, 284],
  [628, 286],
  [676, 290],
  [720, 280],
  [756, 260],
  [788, 240],
  [820, 262],
  [844, 284],
  [868, 306],
  [884, 282],
  [904, 260],
  [924, 238],
  [940, 262],
  [944, 286],
  [948, 310],
  [980, 288],
  [1004, 266],
  [1020, 242],
  [1036, 266],
  [1048, 292],
  [1068, 314],
  [1112, 328],
  [1164, 332],
  [1212, 322],
  [1260, 314],
  [1308, 306],
  [1356, 298],
  [1400, 286],
  [1448, 294],
  [1496, 306],
  [1540, 318],
  [1508, 338],
  [1468, 352],
  [1428, 366],
  [1392, 382],
  [1352, 398],
  [1312, 412],
  [1272, 428],
  [1232, 444],
  [1192, 458],
  [1140, 468],
  [1092, 480],
  [1048, 490],
  [1000, 498],
  [952, 504],
  [904, 510],
  [856, 518],
  [808, 522],
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
function transformPoints(pts, x, y, scale, jitter, cos, sin, cx, cy, yStretch = 1.5) {
  return pts.map(([px, py]) => {
    const j = py < cy - 80
      ? jitter * 0.4                      // fingers: less jitter
      : jitter * brush.random(1.0, 3.0);  // palm + lower: much more
    const tx = (px - cx) * scale + brush.random(-j, j);
    const ty = (py - cy) * scale * yStretch + brush.random(-j, j);
    return [
      x + cos * tx - sin * ty,
      y + sin * tx + cos * ty,
    ];
  });
}

function drawHand(x = hand1CX, y = hand1CY, scale = 1, full = false, { forceErase = false, brushOverride = null, colorOverride = null, rotationRange = Math.PI / 7 } = {}) {
  const jitter = brush.random(1, 5) * scale;

  // Pick which hand shape to draw (full = always hand1)
  const useHand1 = full || brush.random(1) > 0.5;
  const outline  = useHand1 ? hand1 : hand2;
  const cx       = useHand1 ? hand1CX : hand2CX;
  const cy       = useHand1 ? hand1CY : hand2CY;

  // Random rotation ±60°, pre-compute cos/sin once for all transforms
  const rotation = brush.random(-rotationRange, rotationRange);
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);

  brush.wiggle(brush.random(0.1, 3));

  // One brush type per hand
  const handBrush = brushOverride ?? brush.random(brushTypes);

  // Two independent colors: one for fill, one for outline/interior
  const outlineColor = colorOverride ?? brush.random(palette);
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

  // Mutually exclusive: a hand either fills or hatches, never both
  const doFill  = forceErase ? false : brush.random(1) > 0.75;
  const doErase = forceErase ? true  : (!doFill && brush.random(1) > 0.2);
  const doHatch = !doFill && brush.random(1) > 0.25;

  const eraseShape = useHand1 ? hand1EraseShape : hand2EraseShape;
  const eraseCX    = useHand1 ? hand1CX : hand2CX;
  const eraseCY    = useHand1 ? hand1CY : hand2CY;
  const eraseYStretch = useHand1 ? 1.5 : 2;
  const hErase = transformPoints(eraseShape, x, y, scale, jitter * 0.3, cos, sin, eraseCX, eraseCY, eraseYStretch);

  // 1. Fill or erase
  if (doFill || doErase) {
    brush.noStroke();
    brush.erase(bgColor, 255);
    brush.spline(hErase, 0.5);
    brush.noErase();
  }
  if (doFill) {
    brush.fillStyle(fillColor, 100);
    brush.fillBleed(brush.random(0.03, 0.1));
    brush.fillTexture(brush.random(0.1, 0.3), 0.15);
    brush.spline(hErase, 0);
    brush.noFill();
  } 

  // 2. Outline the normal polygon (outlineColor)
  brush.set(handBrush, outlineColor, 1.25);
  brush.spline(h, 1)

  // 3. Interior lines
  for (const [pts] of interiors) {
    brush.spline(tp(pts), 0.5);
  }
  // Sometimes hatch interior details
  if (doHatch) {
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
const handScales = Array.from({length: MAX_HANDS}, () => brush.random(0.35, 0.75) * canvasScale);
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
  const subdivide = (pts, step = 50) => {
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

    // Fill or erase with color
    let filling = brush.random(1) > 0.5 || shape.curved;
    brush.erase(bgColor, 100);
    drawShape();
    brush.noErase();
    
    if (filling) {
      brush.fillStyle(color, 150);
      brush.fillBleed(0.05);
      brush.fillTexture(0.1, 0.15);
    } else {
      brush.erase(color, 85);
      drawShape();
      brush.draw();
      brush.noErase();
    }
    
    brush.hatch(60 * canvasScale, Math.PI / 4);
    brush.hatchStyle("spray", color, 1);
    drawShape();
    brush.noFill();
    brush.noHatch();
    brush.draw();
  }
}


// Earth shapes for composed mode (hand-traced architectural ground geometry)
const earthShape1 = [
  [1853, 641],[1804, 641],[1742, 641],[1693, 641],[1640, 641],[1587, 641],
  [1538, 640],[1485, 640],[1436, 638],[1387, 635],[1333, 635],[1284, 634],
  [1235, 631],[1182, 631],[1129, 631],[1080, 631],[1031, 631],[978, 631],
  [928, 631],[875, 635],[826, 637],[777, 637],[728, 634],[679, 632],
  [630, 632],[581, 632],[532, 632],[483, 632],[487, 650],[532, 657],
  [581, 658],[634, 663],[687, 669],[736, 676],[785, 680],[834, 682],
  [883, 683],[933, 680],[969, 693],[969, 711],[969, 729],[961, 747],
  [949, 764],[941, 781],[990, 786],[1039, 790],[1084, 783],[1088, 764],
  [1104, 747],[1117, 729],[1129, 712],[1141, 695],[1141, 677],[1186, 685],
  [1243, 687],[1301, 689],[1354, 690],[1403, 692],[1452, 692],[1501, 695],
  [1550, 698],[1599, 703],[1636, 715],[1669, 729],[1681, 747],[1677, 764],
  [1644, 779],[1603, 789],[1554, 796],[1505, 799],[1456, 799],[1407, 799],
  [1358, 800],[1309, 803],[1260, 805],[1211, 806],[1162, 809],[1157, 826],
  [1153, 844],[1141, 861],[1186, 868],[1235, 868],[1292, 868],[1346, 868],
  [1399, 870],[1456, 870],[1505, 870],[1554, 871],[1607, 871],[1656, 874],
  [1710, 876],[1759, 876],[1808, 877],[1845, 865],[1840, 848],[1840, 831],
  [1845, 813],[1845, 796],[1845, 779],[1849, 761],[1853, 744],[1861, 726],
  [1869, 709],[1877, 692],[1885, 674],[1890, 657],
];
const earthShape2 = [
  [151, 635],[200, 635],[249, 635],[299, 635],[348, 631],[397, 630],
  [446, 632],[458, 650],[409, 656],[348, 656],[294, 657],[245, 658],
  [196, 658],[147, 658],[151, 641],
];
const earthShape3 = [
  [753, 575],[753, 592],[802, 598],[843, 608],[888, 616],[937, 619],
  [982, 627],[1031, 624],[1088, 616],[1137, 609],[1178, 599],[1182, 582],
  [1145, 569],[1096, 564],[1047, 559],[998, 554],[953, 562],[904, 569],
  [855, 569],[806, 569],[757, 570],
];
const earthShape4 = [
  [793, 469],[818, 485],[851, 498],[896, 505],[945, 498],[994, 492],
  [1047, 491],[1096, 493],[1145, 495],[1194, 499],[1239, 509],[1268, 492],
  [1280, 473],[1231, 472],[1182, 473],[1133, 473],[1080, 473],[1031, 475],
  [982, 475],[933, 469],[883, 465],[834, 466],
];
// Bounding-box center of all earth shapes combined (x: 147–1890, y: 465–877)
const earthShapeCX = 1019, earthShapeCY = 671;

// Composed mode: single large hand over sky / sun / earth
function drawComposedScene() {
  brush.wiggle(0)
  // Pick 3 distinct palette colors
  const usedColors = new Set();
  const pickColor = () => {
    let c;
    do { c = brush.random(palette); } while (usedColors.has(c));
    usedColors.add(c);
    return c;
  };
  const skyColor   = pickColor();
  const sunColor   = pickColor();
  const earthColor = pickColor();

  const subdivide = (pts, step = 2) => {
    const result = [];
    for (let i = 0; i < pts.length; i++) {
      const [x1, y1] = pts[i];
      const [x2, y2] = pts[(i + 1) % pts.length];
      const n = Math.max(1, Math.ceil(Math.hypot(x2 - x1, y2 - y1) / step));
      for (let t = 0; t < n; t++)
        result.push([x1 + (x2 - x1) * (t / n), y1 + (y2 - y1) * (t / n)]);
    }
    return result;
  };

  const drawPoly = (pts, curvature = 0) => {
    brush.beginPath(curvature);
    brush.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) brush.lineTo(pts[i][0], pts[i][1]);
    brush.closePath();
    brush.endPath();
  };

  const fillShape = (pts, color, curvature = 0, isBlob) => {
    brush.noStroke();
    brush.erase(bgColor, 100);
    drawPoly(pts, curvature);
    brush.noErase();
    brush.draw();
    if (isBlob) {
      brush.fillStyle(color, 150);
      brush.fillBleed(0.05);
      brush.fillTexture(0.1, 0.15);
    } else {
      brush.erase(color, 80);
      drawPoly(pts, curvature);
      brush.draw();
      brush.noErase();
    }
    brush.hatch(10 * canvasScale, Math.PI / 4, { gradient: 0.1 });
    brush.hatchStyle("spray", color, 1);
    drawPoly(pts, curvature);
    brush.noFill();
    brush.draw();
    brush.noErase();
    brush.noHatch();
  };

  // 1. Sky — framed rect (inset from canvas edges), optionally with irregular bottom edge
  const skyH  = brush.random(0.52, 0.65);
  const mX    = w * brush.random(0.04, 0.08); // horizontal margin
  const mY    = h * brush.random(0.04, 0.08); // vertical margin (top)
  const skyX0 = mX,  skyX1 = w - mX;
  const skyY0 = mY,  skyY1 = h * skyH;
  const useComplexSky = brush.random(1) > 0.3;
  let skyPts;
  if (useComplexSky) {
    const numBumps = Math.floor(brush.random(3, 6));
    const bottomEdge = Array.from({ length: numBumps + 2 }, (_, i) => {
      const t = i / (numBumps + 1);
      return [skyX0 + t * (skyX1 - skyX0), skyY1 + brush.random(-h * 0.04, h * 0.04)];
    }).reverse();
    skyPts = subdivide([[skyX0, skyY0], [skyX1, skyY0], [skyX1, skyY1], ...bottomEdge]);
  } else {
    skyPts = subdivide([[skyX0, skyY0], [skyX1, skyY0], [skyX1, skyY1], [skyX0, skyY1]]);
  }
  fillShape(skyPts, skyColor);

  // 2. Sun — blob in upper-right area
  const sunCX = brush.random(w * 0.62, w * 0.85);
  const sunCY = brush.random(h * 0.04, h * 0.20);
  const sunRX = w * brush.random(0.06, 0.13);
  const sunRY = h * brush.random(0.07, 0.15);
  const sunPts = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return [sunCX + Math.cos(a) * sunRX * brush.random(0.75, 1.25),
            sunCY + Math.sin(a) * sunRY * brush.random(0.75, 1.25)];
  });
  fillShape(sunPts, sunColor, brush.random(0.6, 1), true);

  // 3. Earth — scaled so bounding-box width matches the sky width, centered on sky
  const earthRefW   = 1890 - 147; // reference bounding-box width of all earthShapes
  const earthScale  = (skyX1 - skyX0) / earthRefW;
  const earthPosX   = (skyX0 + skyX1) / 2;
  const earthPosY   = h * brush.random(0.65, 0.74);
  const earthJitter = 2 * earthScale;
  const te = (pts) => transformPoints(pts, earthPosX, earthPosY, earthScale, earthJitter, 1, 0, earthShapeCX, earthShapeCY, 2.4);

  for (const shape of [earthShape1, earthShape2, earthShape3, earthShape4]) {
    fillShape(te(shape), earthColor, 1);
  }

  brush.draw();
}

const composedMode = brush.random(1) > 0.3;

brush.wiggle(1)

if (composedMode) {
  drawComposedScene();
} else {
  drawBackgroundShapes();
}

const draw = () => {
  if (composedMode) {
    brush.noLoop();
    const handX     = w * brush.random(0.43, 0.57);
    const handY     = h * brush.random(0.38, 0.50);
    // hand1 bbox height: 789−83 = 706px; with yStretch=1.5 → 1059px effective at scale=1
    // Scale so the hand occupies 55–72% of canvas height
    const handRefH  = (789 - 83) * 1.5;
    const handScale = (h * brush.random(0.35, 0.48)) / handRefH;
    drawHand(handX, handY, handScale, true, {
      forceErase:    true,
      brushOverride: 'charcoal',
      colorOverride: '#080f15',
      rotationRange: Math.PI / 10,
    });
  } else {
    if (handCount >= MAX_HANDS) { brush.noLoop(); return; }
    const [x, y] = positions[handCount];
    const isLast = handCount === MAX_HANDS - 1;
    handCount++;
    drawHand(x, y, handScales[handCount - 1], isLast);
  }
};

brush.frameRate(5);
brush.loop(draw);