// I want to import only the neccesary functions from the brush library. The functions are now used as "functioname". Check the full code
import { 
  createCanvas,
  scaleBrushes,
  random,
  wRand,
  set,
  frameCount,
  loop,
  background,
  wiggle,
  stroke,
  noStroke,
  circle,
  hatchStyle,
  hatch,
  noHatch,
  beginPath,
  moveTo,
  lineTo,
  closePath,
  endPath,
  strokeStyle,
  box,
  frameRate
} from '@acamposuribe/brush';

const bgPalette = [
  245,
  "#fffceb",
  "#ffe6d4",
];

const palette = [
  "#7b4800",
  "#002185",
  "#003c32",
  "#fcd300",
  "#ff2702",
  "#6b9404",
];

// Create main canvas and load library
let w = 2000, h = 2000;
createCanvas(w, h);

scaleBrushes(10);

const baseColor = random(palette);
const multicolor = wRand({ "no": 50, "si": 50 }) === "si";
const nS = Math.floor(random(1, 6));
const lineColor = multicolor ? random(palette) : baseColor;
const bgColor = random(bgPalette);
const faces = Array(8).fill(false);

let mouseMode = false;
let velocidad = 0;
let startX, startY;

const r = () => random(-5, 5);

const triangle = (x1, y1, x2, y2, x3, y3) => {
  [x1, y1, x2, y2, x3, y3] = [x1, y1, x2, y2, x3, y3].map(coord => coord + r());
  for (let i = 0; i < 2; i++) {
    if (i > 0) noStroke();
    beginPath();
    moveTo(x1, y1);
    lineTo(x2, y2);
    lineTo(x3, y3);
    closePath();
    endPath();
  }
};

const hatchear = (dist, angle, bool) => {
  if (bool) {
    hatch(dist, angle + Math.PI / 180, { continuous: true, rand: 0.05, gradient: 0.1 });
  } else {
    noHatch(); 
  }
};

// Mouse event listeners
const updateVelocity = (event) => {
  const endX = event.clientX;
  const endY = event.clientY;
  const dx = endX - startX;
  const dy = endY - startY;
  velocidad = Math.sqrt(dx ** 2 + dy ** 2) / 1000 * (dx < 0 ? -1 : 1);
  startX = endX;
  startY = endY;
};

document.addEventListener("mousedown", (event) => {
  currentCount = mouseMode ? currentCount : frameCount / 15;
  mouseMode = true;
  startX = event.clientX;
  startY = event.clientY;
  velocidad = 0;
});

document.addEventListener("mousemove", (event) => {
  if (event.buttons === 1) {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      let vlc = Math.sqrt(dx ** 2 + dy ** 2) / 1000 * (dx < 0 ? -1 : 1);
      currentCount += vlc;
  }
});

document.addEventListener("mouseup", updateVelocity);

let currentCount = 0;
const counter = () => (mouseMode ? currentCount : frameCount / 15);

const setBrush = () => set("2B", lineColor, 1);

// Draw loop
const draw = () => {
  if (mouseMode) currentCount += velocidad;

  background(bgColor);

  // DRAW BACKGROUND ELEMENTS
  if (!mouseMode) {
    wiggle(5);
    for (let i = 0; i < 2; i++) {
      set(random(box()), random(palette), 1);
      stroke(
        random(0, 2000),
        random(0, 2000),
        random(300, 2000),
        random(0, 2 * Math.PI)
      );
    }
    
    wiggle(3);

    if (random() < 0.2) {
      let color;
      do {
        color = random(palette);
      } while (color === "black");

      strokeStyle(color);
      hatchStyle("charcoal", color, 1);
      hatch(7, random(0, Math.PI));
    } else {
      noHatch();
    }

    circle(
      random(0, w),
      random(0, h),
      random(90, 140),
      true
    );
    noHatch();
  }

  // DRAW FACES
  wiggle(3);
  hatchStyle("charcoal", baseColor, 1);
  const dist = random(30, 60);
  const angle = Math.PI;

  const base = Array.from({ length: 4 }, (_, i) => {
    const desp = i * Math.PI / 2;
    return [
      [1000 + Math.sin(counter() + desp) * 500, 1000 + Math.sin(counter() + Math.PI / 2 + desp) * 300],
      [1000 + Math.sin(counter() + Math.PI / 2 + desp) * 500, 1000 + Math.sin(counter() + Math.PI + desp) * 300],
    ];
  }).flat();

  noStroke();
  hatchear(dist, Math.PI, true);
  beginPath();
  moveTo(base[0][0], base[0][1]);
  base.slice(1).forEach(([x, y]) => lineTo(x, y));
  closePath();
  endPath();

  for (let i = 0; i < 4; i++) {
    if (random() < 0.05) faces[2 * i] = true;
    if (random() < 0.05) faces[2 * i + 1] = true;

    const color = multicolor ? palette[(nS + i) % 6] : baseColor;
    const desp = i * Math.PI / 2;
    const h1 = [1000 + Math.sin(counter() + desp) * 500, 1000 + Math.sin(counter() + Math.PI / 2 + desp) * 300];
    const h2 = [1000 + Math.sin(counter() + Math.PI / 2 + desp) * 500, 1000 + Math.sin(counter() + Math.PI + desp) * 300];

    const dPos = (1500 - h2[0]) / 1000;
    const hPos = (h2[1] - 700) / 600;
    const hDist = dist * (0.3 + 3 * dPos + hPos);

    hatchStyle("charcoal", color, 1.3 - dPos);

    if (faces[2 * i]) {
      const angleDiff = Math.atan2(160 - h2[1], 1000 - h2[0]) - Math.atan2(160 - h1[1], 1000 - h1[0]);
      let hatch = true;
      if (angleDiff > 0) hatch = false;
      if (hatch) setBrush();
      hatchear(hDist, angle + i * Math.PI/2, hatch);
      triangle(h1[0], h1[1], 1000, 160, h2[0], h2[1]);
    }

  if (faces[2 * i + 1]) {
    let hatch = true;
      const angleDiff = Math.atan2(1840 - h2[1] - 80, 1000 - h2[0]) - Math.atan2(1840 - h1[1] - 80, 1000 - h1[0]);
      if (angleDiff < 0) hatch = false;
      if (hatch) setBrush();
      hatchear(hDist, angle + i * Math.PI/2, hatch);
      triangle(h1[0], h1[1] + 80, 1000, 1840, h2[0], h2[1] + 80);
    }
  }
};

frameRate(20);
setTimeout(() => loop(draw), 200);