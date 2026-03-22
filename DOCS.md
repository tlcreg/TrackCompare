# TrackCompare — Documentation

A browser-based race replay tool for track events. Open `index.html` directly in Chrome or Safari — no server needed.

---

## How to use it

1. Open `index.html` in a browser
2. Check/uncheck runners in the bottom-left panel to show or hide them
3. Press **Play** or drag the scrubber to scrub through the race
4. Adjust **Speed** (1×–60×) to control playback rate
5. The **Gap vs Leader** table on the right shows each runner's time gap at every split, with the current split highlighted during playback
6. Press **Export GIF** to capture a full replay as a downloadable `.gif`

---

## Adding a new 5000m race

All race data lives in `data.js`. Replace or duplicate it for a new race.

### Step 1 — Fill in `runners`

Each runner entry follows this shape:

```js
{
  place: 1,                    // finishing place
  name: "First Last",
  finalTime: "16:49.546",      // raw string from timing system
  cumulative: [
    "37.738",      // 200m  (cumulative from start)
    "1:54.364",    // 600m
    "3:10.837",    // 1000m
    "4:29.448",    // 1400m
    "5:49.003",    // 1800m
    "7:09.970",    // 2200m
    "8:32.786",    // 2600m
    "9:57.013",    // 3000m
    "11:22.073",   // 3400m
    "12:46.798",   // 3800m
    "14:13.823",   // 4200m
    "15:35.935",   // 4600m
    "16:49.546",   // 5000m  ← must match finalTime
  ],
}
```

**Times are raw strings** — no rounding, exactly as printed by the timing system.
`toSeconds()` converts them at runtime.

### Step 2 — Confirm `SPLIT_DISTANCES`

At the top of `data.js`:

```js
const SPLIT_DISTANCES = [200, 600, 1000, 1400, 1800, 2200, 2600, 3000, 3400, 3800, 4200, 4600, 5000];
```

This must match the split columns your timing system exports. The 5000m layout is:
- **First split:** 200m (half lap, opener)
- **Remaining splits:** every 400m (one full lap each)

### Step 3 — Done

Reload `index.html`. The app reads `data.js` on load and rebuilds everything automatically.

---

## Adding a mile race

### Track geometry of a mile

On a 400m track, **1 mile = 1609.344m = 4 laps + 9.344m**.

In this app, the **finish line** is at the **bottom-right corner** of the animated track (the 200m mark in the current 0-reference system). The mile **start line** sits **9.344m to the left** of that finish corner, on the bottom straight.

### Step 1 — Create `data_mile.js`

Copy `data.js` and change the split structure. A standard mile uses 200m splits:

```js
// data_mile.js

const SPLIT_DISTANCES = [200, 400, 600, 800, 1000, 1200, 1400, 1609];
// or if your timing system uses 200/400/800/1200/1609, adjust accordingly

const runners = [
  {
    place: 1,
    name: "Runner Name",
    finalTime: "4:05.23",
    cumulative: [
      "30.12",    // 200m
      "1:01.45",  // 400m
      "1:33.20",  // 600m
      "2:04.88",  // 800m
      "2:36.50",  // 1000m
      "3:08.10",  // 1200m
      "3:39.75",  // 1400m
      "4:05.23",  // 1609m (finish)
    ],
  },
  // ... more runners
];
```

### Step 2 — Adjust the start offset in `index.html`

The mile start is not at 0m on the track — it's offset so the finish lands at the bottom-right corner.

In `index.html`, find `runnerDist()` and add an offset constant at the top of the script block:

```js
// For a mile: start is 9.344m before the bottom-right corner (200m mark)
// Bottom-right = 200m in track coords → mile start = 200 - 9.344 = 190.656m
const RACE_START_OFFSET = 190.656; // meters — 0 for 5000m, 190.656 for mile

function runnerDist(r, T) {
  // ... existing logic returns distance from 0
  // wrap result with offset:
  return (dist + RACE_START_OFFSET) % totalRaceDistance; // adjust as needed
}
```

> **Why 190.656m?**
> The finish is at position 200m on the track loop. Running 1609.344m backwards from 200m:
> `200 - 1609.344 = -1409.344` → `mod 400 = 190.656m`
> Positions 190.656m → 200m → (4 more full laps) → 200m again = exactly 1609.344m total.

### Step 3 — Draw the mile start marker

In `drawFrame()`, add a marker for the start line:

```js
// After the existing drawLapMark calls:
drawLapMark(190.656, '#00ff88', 2, 'START'); // mile start, 9.344m before bottom-right
drawLapMark(200,     '#FF4444', 2, 'FINISH'); // shared finish line
```

### Step 4 — Update `SPLIT_DISTANCES` in the HTML

In `index.html`, the `SPLIT_DISTANCES` constant is imported from `data.js` — so as long as your mile `data_mile.js` defines it correctly, no further changes are needed in the JS logic.

### Step 5 — Swap the data file

In `index.html`, change:

```html
<script src="data.js"></script>
```
to:
```html
<script src="data_mile.js"></script>
```

---

## Track coordinate system

```
(CX-SL, CY-TR) ── top straight ──────────── (CX+SL, CY-TR)
      │                                              │
   left curve                                   right curve
   (bulges left)                               (bulges right)
      │                                              │
(CX-SL, CY+TR) ── bottom straight ───────── (CX+SL, CY+TR)
   ↑ START (0m)                                ↑ FINISH (200m = 5000m / mile finish)
```

- Direction: **counter-clockwise** (top-left → bottom-left → bottom-right → top-right)
- `CX`, `CY` — canvas center point
- `SL` — half the straight length in canvas pixels
- `TR` — curve radius in canvas pixels
- `PERIM` — total oval perimeter in pixels = `4*SL + 2π*TR`
- Meters → pixels: multiply by `PERIM / 400`

### Key position landmarks (5000m)

| Distance | Track position | Canvas coords |
|----------|---------------|---------------|
| 0m       | Top-left      | `(CX-SL, CY-TR)` |
| ~85m     | Bottom-left   | `(CX-SL, CY+TR)` |
| 200m     | Bottom-right  | `(CX+SL, CY+TR)` — **5000m & mile FINISH** |
| ~285m    | Top-right     | `(CX+SL, CY-TR)` |
| 400m     | Top-left      | back to start |

### Mile start (for reference)

| | Distance on track | Canvas position |
|---|---|---|
| Mile start | 190.656m | 9.344m left of bottom-right corner, on the bottom straight |
| Mile finish | 200m | Bottom-right corner |

---

## Geometry constants (in `index.html`)

```js
const CX = 480;   // horizontal center of canvas
const CY = 205;   // vertical center of canvas
const SL = 250;   // half-straight length (px)
const TR = 130;   // curve radius (px)
```

Increase `SL` to stretch the straights. Increase `TR` to widen the curves.
Canvas logical size is set in the `scaleCanvas()` function: currently `W=960, H=410`.

---

## GIF export notes

- GIF export requires an internet connection to load `gif.js` from CDN
- Captures 120 frames evenly spaced across the full race duration
- Output is always named `race_replay.gif`
- If `gif.js` fails to load, the status label will say so — check the browser console

---

## File structure

```
TrackCompare/
├── index.html      — full app (HTML + CSS + JS in one file)
├── data.js         — race data for the current event
├── DOCS.md         — this file
└── .gitignore
```

To run multiple events side by side, duplicate `data.js` (e.g. `data_mile.js`, `data_5k_2027.js`) and swap the `<script src="...">` tag in `index.html`.
