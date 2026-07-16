// F1 Racer championship calendar: 22 rounds, every circuit hardcoded as a
// stylized version of the real-world layout (the SVGs in src/assets/tracks
// are decorative illustrations, not accurate paths, so the centerlines are
// authored here instead).
//
// Points are coarse centerline waypoints in a 960x600 space; they are
// smoothed with Chaikin's algorithm before rendering / simulation.

const TRACK_POINTS = {
  // Round 1 — Sakhir: angular desert track, long straights into tight lobes.
  bahrain: [
    [170, 480], [400, 500], [560, 490], [640, 450], [600, 390], [520, 370],
    [500, 310], [560, 270], [660, 280], [740, 250], [760, 180], [700, 130],
    [600, 120], [520, 150], [430, 140], [340, 110], [250, 120], [200, 170],
    [230, 230], [300, 270], [280, 330], [210, 360], [150, 400], [130, 440],
  ],
  // Round 2 — Jeddah: ultra-long, thin, high-speed street esses.
  'saudi-arabia': [
    [150, 445], [260, 465], [380, 450], [500, 468], [620, 452], [740, 468],
    [840, 455], [890, 395], [870, 325], [800, 298], [700, 312], [590, 296],
    [480, 310], [370, 296], [260, 310], [180, 298], [115, 325], [108, 388],
  ],
  // Round 3 — Melbourne: flowing parkland loop around the lake.
  australia: [
    [150, 430], [190, 370], [180, 300], [210, 240], [280, 200], [370, 180],
    [470, 175], [560, 150], [650, 120], [740, 115], [810, 150], [840, 220],
    [820, 290], [760, 330], [690, 340], [620, 370], [540, 400], [460, 420],
    [380, 430], [300, 450], [220, 470], [160, 470],
  ],
  // Round 4 — Suzuka: the legendary figure-eight crossover.
  suzuka: [
    [180, 505], [120, 455], [105, 375], [130, 295], [195, 248], [275, 238],
    [350, 258], [430, 285], [505, 300], [585, 295], [660, 262], [710, 205],
    [700, 140], [635, 100], [545, 92], [470, 115], [438, 175], [455, 235],
    [505, 295], [560, 345], [600, 415], [575, 478], [500, 510], [390, 522],
    [280, 520],
  ],
  // Round 5 — Shanghai: long back straight, tight hairpin, snail-style curls.
  china: [
    [250, 478], [500, 492], [700, 480], [820, 450], [868, 380], [850, 300],
    [800, 250], [830, 195], [780, 150], [620, 140], [440, 132], [280, 140],
    [160, 150], [120, 215], [170, 262], [240, 255], [280, 310], [240, 368],
    [170, 395], [150, 450],
  ],
  // Round 6 — Miami: smooth sweeps around the stadium, tight chicane south.
  miami: [
    [150, 300], [190, 220], [270, 170], [380, 150], [520, 145], [650, 150],
    [760, 170], [830, 220], [845, 290], [800, 340], [700, 350], [600, 340],
    [500, 345], [430, 380], [380, 430], [420, 470], [520, 480], [560, 510],
    [520, 545], [400, 540], [280, 520], [190, 480], [140, 420], [130, 350],
  ],
  // Round 7 — Imola: elongated riverside classic, Tosa hairpin far left.
  imola: [
    [720, 480], [560, 470], [470, 440], [380, 455], [290, 440], [200, 430],
    [140, 390], [130, 320], [170, 280], [240, 270], [300, 230], [330, 170],
    [390, 130], [470, 120], [540, 150], [560, 210], [610, 260], [680, 270],
    [740, 240], [800, 250], [830, 310], [810, 380], [790, 440], [760, 475],
  ],
  // Round 8 — Monte Carlo: tight streets and the famous hairpin.
  monaco: [
    [140, 470], [120, 380], [135, 300], [190, 255], [265, 245], [330, 215],
    [350, 155], [420, 110], [510, 95], [575, 120], [585, 180], [535, 220],
    [505, 265], [545, 300], [625, 295], [700, 255], [775, 240], [840, 275],
    [865, 345], [835, 415], [760, 440], [680, 430], [600, 445], [545, 490],
    [470, 515], [360, 520], [240, 515], [170, 500],
  ],
  // Round 9 — Montreal: long island parallels, hairpin at the east end.
  canada: [
    [180, 420], [400, 442], [620, 438], [790, 420], [862, 372], [868, 302],
    [812, 276], [700, 290], [560, 300], [420, 295], [300, 288], [210, 275],
    [135, 290], [112, 345], [148, 398],
  ],
  // Round 10 — Barcelona: long pit straight, sweeping T3, stadium loop.
  spain: [
    [170, 480], [520, 500], [660, 480], [760, 430], [830, 360], [850, 270],
    [810, 200], [720, 160], [600, 150], [480, 170], [380, 150], [280, 120],
    [190, 140], [150, 210], [180, 280], [260, 310], [320, 360], [300, 420],
    [230, 445],
  ],
  // Round 11 — Red Bull Ring: short, sharp triangle in the hills.
  austria: [
    [140, 470], [420, 500], [700, 490], [830, 440], [850, 370], [780, 320],
    [700, 270], [620, 220], [560, 160], [480, 110], [380, 100], [320, 150],
    [330, 220], [300, 290], [240, 350], [170, 410],
  ],
  // Round 12 — Silverstone: high-speed esses, home of British motorsport.
  silverstone: [
    [140, 420], [120, 330], [140, 250], [200, 200], [280, 180], [340, 140],
    [420, 110], [500, 120], [540, 170], [600, 200], [670, 180], [730, 140],
    [810, 130], [865, 175], [870, 250], [830, 310], [760, 340], [700, 390],
    [720, 450], [770, 490], [750, 540], [660, 550], [560, 520], [470, 540],
    [370, 550], [270, 530], [190, 490],
  ],
  // Round 13 — Hungaroring: twisting amphitheatre bowl.
  hungary: [
    [160, 440], [140, 360], [170, 290], [240, 250], [310, 270], [380, 250],
    [430, 200], [500, 170], [580, 180], [640, 220], [700, 200], [770, 190],
    [830, 230], [850, 300], [820, 370], [750, 400], [670, 390], [590, 420],
    [500, 440], [410, 425], [330, 450], [240, 470],
  ],
  // Round 14 — Spa-Francorchamps: flowing forest sweeps in the Ardennes.
  spa: [
    [120, 150], [200, 108], [300, 98], [385, 128], [428, 192], [470, 252],
    [540, 290], [620, 300], [700, 272], [758, 215], [828, 188], [880, 228],
    [886, 300], [846, 362], [772, 392], [702, 432], [640, 482], [558, 512],
    [458, 522], [358, 506], [278, 470], [200, 430], [142, 370], [110, 278],
    [104, 200],
  ],
  // Round 15 — Zandvoort: compact dunes circuit, Tarzan bowl and banking.
  netherlands: [
    [200, 460], [150, 390], [160, 310], [220, 260], [300, 240], [330, 180],
    [400, 140], [490, 130], [560, 170], [560, 240], [610, 290], [690, 290],
    [760, 250], [830, 270], [850, 340], [810, 400], [730, 430], [640, 420],
    [550, 450], [450, 480], [350, 490], [260, 490],
  ],
  // Round 16 — Monza: the Temple of Speed, chicanes between long straights.
  monza: [
    [120, 500], [112, 210], [130, 145], [190, 112], [330, 105], [370, 150],
    [420, 168], [560, 168], [598, 120], [668, 98], [788, 102], [852, 142],
    [865, 210], [832, 262], [768, 278], [742, 330], [778, 382], [852, 412],
    [868, 470], [825, 522], [730, 538], [420, 535], [360, 512], [240, 505],
    [165, 520],
  ],
  // Round 17 — Baku: seafront flat-out run, tight castle switchbacks.
  azerbaijan: [
    [140, 480], [400, 500], [650, 495], [820, 480], [870, 420], [860, 350],
    [800, 320], [700, 325], [600, 315], [520, 300], [450, 280], [380, 290],
    [330, 260], [300, 200], [250, 160], [190, 170], [170, 220], [210, 260],
    [190, 310], [140, 330], [110, 380], [115, 440],
  ],
  // Round 18 — Marina Bay: angular right-angle street corners at night.
  singapore: [
    [160, 460], [160, 380], [200, 340], [190, 260], [240, 210], [330, 200],
    [400, 160], [500, 150], [600, 155], [700, 140], [790, 160], [830, 220],
    [820, 290], [770, 330], [700, 340], [650, 390], [560, 400], [470, 420],
    [380, 410], [300, 440], [230, 480], [170, 490],
  ],
  // Round 19 — COTA: uphill T1 hairpin, esses, big stadium sweep.
  usa: [
    [430, 520], [350, 470], [330, 400], [370, 340], [430, 290], [470, 240],
    [450, 190], [380, 170], [310, 185], [265, 235], [215, 275], [160, 290],
    [115, 250], [120, 185], [175, 135], [270, 100], [390, 88], [520, 108],
    [640, 148], [750, 198], [820, 268], [832, 348], [782, 408], [702, 428],
    [622, 398], [560, 428], [540, 488], [490, 528],
  ],
  // Round 20 — Mexico City: huge main straight, Foro Sol stadium section.
  mexico: [
    [200, 470], [480, 492], [700, 482], [830, 452], [872, 385], [858, 240],
    [810, 160], [720, 130], [600, 118], [480, 132], [360, 118], [260, 130],
    [170, 160], [130, 230], [150, 300], [220, 330], [300, 320], [350, 360],
    [330, 410], [260, 430],
  ],
  // Round 21 — Interlagos: compact anticlockwise kidney with the Senna S.
  brazil: [
    [180, 250], [230, 200], [280, 170], [380, 155], [500, 148], [620, 150],
    [720, 168], [800, 212], [845, 290], [840, 380], [790, 445], [700, 480],
    [600, 465], [510, 490], [410, 505], [300, 495], [210, 460], [160, 395],
    [145, 320],
  ],
  // Round 22 — Yas Marina: long marina straights, twisty hotel section.
  'abu-dhabi': [
    [170, 470], [300, 488], [430, 472], [570, 488], [710, 474], [830, 482],
    [882, 420], [864, 345], [796, 318], [680, 330], [556, 316], [432, 330],
    [308, 316], [196, 330], [128, 352], [108, 412], [136, 452],
  ],
};

const TRACK_WIDTHS = {
  monaco: 54,
  suzuka: 54,
  canada: 52,
  'saudi-arabia': 52,
  azerbaijan: 52,
};

const CALENDAR = [
  { id: 'bahrain', name: 'Bahrain', circuit: 'Sakhir' },
  { id: 'saudi-arabia', name: 'Saudi Arabia', circuit: 'Jeddah' },
  { id: 'australia', name: 'Australia', circuit: 'Melbourne' },
  { id: 'suzuka', name: 'Japan', circuit: 'Suzuka' },
  { id: 'china', name: 'China', circuit: 'Shanghai' },
  { id: 'miami', name: 'Miami', circuit: 'Miami Intl.' },
  { id: 'imola', name: 'Emilia-Romagna', circuit: 'Imola' },
  { id: 'monaco', name: 'Monaco', circuit: 'Monte Carlo' },
  { id: 'canada', name: 'Canada', circuit: 'Montreal' },
  { id: 'spain', name: 'Spain', circuit: 'Barcelona' },
  { id: 'austria', name: 'Austria', circuit: 'Red Bull Ring' },
  { id: 'silverstone', name: 'Great Britain', circuit: 'Silverstone' },
  { id: 'hungary', name: 'Hungary', circuit: 'Hungaroring' },
  { id: 'spa', name: 'Belgium', circuit: 'Spa-Francorchamps' },
  { id: 'netherlands', name: 'Netherlands', circuit: 'Zandvoort' },
  { id: 'monza', name: 'Italy', circuit: 'Monza' },
  { id: 'azerbaijan', name: 'Azerbaijan', circuit: 'Baku' },
  { id: 'singapore', name: 'Singapore', circuit: 'Marina Bay' },
  { id: 'usa', name: 'United States', circuit: 'COTA' },
  { id: 'mexico', name: 'Mexico', circuit: 'Mexico City' },
  { id: 'brazil', name: 'Brazil', circuit: 'Interlagos' },
  { id: 'abu-dhabi', name: 'Abu Dhabi', circuit: 'Yas Marina' },
];

function perimeterOf(points) {
  let total = 0;
  for (let i = 0; i < points.length; i++) {
    const [ax, ay] = points[i];
    const [bx, by] = points[(i + 1) % points.length];
    total += Math.hypot(bx - ax, by - ay);
  }
  return total;
}

export const TRACKS = CALENDAR.map((entry, index) => {
  const points = TRACK_POINTS[entry.id];
  // Shorter circuits get more laps so every race lasts a similar time.
  const perimeter = perimeterOf(points);
  return {
    ...entry,
    round: index + 1,
    laps: perimeter > 2000 ? 3 : perimeter > 1600 ? 4 : 5,
    width: TRACK_WIDTHS[entry.id] ?? 56,
    points,
  };
});

/* -------------------------------- Geometry -------------------------------- */

const geometryCache = new Map();

// Chaikin corner-cutting on a closed polygon: doubles point count per pass,
// turning the coarse waypoints into a smooth dense centerline.
function chaikin(points, iterations) {
  let pts = points;
  for (let iter = 0; iter < iterations; iter++) {
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const q = pts[(i + 1) % pts.length];
      out.push(
        { x: 0.75 * p.x + 0.25 * q.x, y: 0.75 * p.y + 0.25 * q.y },
        { x: 0.25 * p.x + 0.75 * q.x, y: 0.25 * p.y + 0.75 * q.y }
      );
    }
    pts = out;
  }
  return pts;
}

export function getTrackGeometry(track) {
  if (geometryCache.has(track.id)) return geometryCache.get(track.id);
  // Tracks with fewer coarse points are smoothed harder for comparable density.
  const iterations = track.points.length < 20 ? 3 : 2;
  const pts = chaikin(
    track.points.map(([x, y]) => ({ x, y })),
    iterations
  );
  const geometry = { pts, n: pts.length };
  geometryCache.set(track.id, geometry);
  return geometry;
}
