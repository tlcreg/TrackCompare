# TrackCompare — Documentation

A browser-based race replay tool for track events. Works on desktop and mobile. Open `index.html` locally, or visit the hosted version at **https://tlcreg.github.io/TrackCompare/**.

---

## How to use it

1. **Select a race** using the buttons in the top-right (e.g. "5000m", "Mile")
2. **Check/uncheck runners** in the bottom-left panel to show or hide them on the track
3. Press **Play** or drag the **scrubber** to move through the race
4. Adjust **Speed** (1×–60×) to control playback rate
5. The **Gap vs Leader** table shows each runner's cumulative time gap at every split — the current split highlights automatically during playback
6. On **mobile**, use the **Runners / Splits** tab bar to switch between the two bottom panels

The lap counter in the top-right of the canvas tracks the leader's current lap. For the 5000m, it shows 0 during the 200m opener then 1–12 for each full lap. For the mile, it shows 1–4.

---

## Adding a new race

All race data lives in `races.js`. Each race is one object in the `RACES` array. Adding a new race is just adding a new entry — no changes to `index.html` are needed.

### Race object shape

```js
{
  id:           'unique_id',          // used internally — no spaces
  label:        'Display Name',       // shown on the selector button (e.g. "5000m", "Mile")
  title:        'Event Name',         // drawn on canvas top-center (e.g. "Tucson Track Club Classic")
  subtitle:     'Subtitle',           // drawn below title (e.g. "5000m  ·  400m Track  ·  March 21, 2026")
  splitDistances: [200, 600, ...],    // cumulative meters of each split, must match timing system
  startOffset:  0,                    // meters into the track loop where the race starts (see below)
  runners: [
    {
      place: 1,
      name: "First Last",
      finalTime: "16:49.546",         // raw string from timing system — do not round
      cumulative: ["37.738", "1:54.364", ...],  // one entry per split, must match splitDistances length
    },
    // ... more runners
  ],
}
```

**Times are raw strings** from the timing system (e.g. `"37.738"` or `"1:54.364"`). Do not round them.

### 5000m example

The 5000m starts at the top-left of the track (0m) and finishes at the bottom-right (200m on the loop, after 12.5 laps). The timing system reports a 200m opener then every 400m through 5000m:

```js
{
  id:           '5k_2027',
  label:        '5000m',
  title:        'Your Meet Name',
  subtitle:     '5000m  ·  400m Track  ·  Date',
  splitDistances: [200, 600, 1000, 1400, 1800, 2200, 2600, 3000, 3400, 3800, 4200, 4600, 5000],
  startOffset:  0,
  runners: [
    {
      place: 1, name: "Runner Name", finalTime: "16:49.546",
      cumulative: ["37.738","1:54.364","3:10.837","4:29.448","5:49.003",
                   "7:09.970","8:32.786","9:57.013","11:22.073","12:46.798",
                   "14:13.823","15:35.935","16:49.546"],
    },
    // ... more runners
  ],
}
```

### Mile example

The mile starts 9.344m before the bottom-right finish corner. That translates to `startOffset: 190.656` in track coordinates. The timing system typically reports splits at 400m, 800m, 1200m, and 1609m:

```js
{
  id:           'mile_2027',
  label:        'Mile',
  title:        'Your Meet Name',
  subtitle:     'Mile  ·  400m Track  ·  Date',
  splitDistances: [400, 800, 1200, 1609],
  startOffset:  190.656,
  runners: [
    {
      place: 1, name: "Runner Name", finalTime: "4:35.870",
      cumulative: ["1:08.846", "2:16.450", "3:26.625", "4:35.870"],
    },
    // ... more runners
  ],
}
```

> **Why 190.656?** The finish line is at 200m on the track loop. A mile = 1609.344m = 4 laps + 9.344m. Working backwards from 200m: `200 − 9.344 = 190.656m`. Runners starting there travel exactly 1609.344m to reach 200m again.

### Mixed heats

If your timing system combines multiple heats into a single result (as in the mile), just include all runners in the same `runners` array with their combined place numbers. Add a `heat` field for display if you want:

```js
{ place: 12, heat: 'H2', name: "Sarah Jackson", finalTime: "6:12.862", cumulative: [...] }
```

The `heat` field is stored but not currently displayed on the canvas.

---

## How `startOffset` works for other events

`startOffset` is the position (in meters around the 400m loop) where the race begins. The finish line is always at 200m on the loop (bottom-right corner of the oval).

| Event | startOffset | Notes |
|-------|-------------|-------|
| 5000m | 0 | Starts at top-left (0m), finishes at 200m after 12.5 laps |
| Mile  | 190.656 | Starts 9.344m before bottom-right, finishes there after 4 laps |
| 3000m | 200 | Starts at finish line (200m), runs 7.5 laps — `(200+3000)%400=200` ✓ |
| 1500m | 110 | `(110+1500)%400=210`… verify with your track's start line position |
| 800m  | 200 | Two laps from the finish line |

For any event, the formula to verify: `(startOffset + raceDistance) % 400` should equal `200` (the finish position).

---

## Lap counter logic

The lap display adapts automatically based on `splitDistances`:

- **If the first split < 400m** (e.g. 200m opener in 5000m): shows `0` during the opener, then counts 1–12 for each full 400m lap after that
- **If the first split = 400m** (e.g. mile): starts at `1` and advances every 400m up to 4

Total lap count is derived from the race distance — no manual configuration needed.

---

## Colors

Runners are assigned colors in order from the `COLORS` array at the top of `index.html`. The first 14 are set. If you have more than 14 runners, add more color hex values to that array.

---

## File structure

```
TrackCompare/
├── index.html      — full app (HTML + CSS + JS in one file)
├── races.js        — all race data (RACES array)
├── DOCS.md         — this file
└── .gitignore
```

Old standalone data files (`data.js`, `data_5k_h1.js`, `data_mile_h1.js`) are superseded by `races.js` and can be deleted.

---

## Hosting & sharing

The app is hosted on GitHub Pages at **https://tlcreg.github.io/TrackCompare/**.

To update after adding races: commit your changes to `races.js` and push to `main`. GitHub Pages redeploys automatically within ~30 seconds.

To share: paste the URL in an email or text. Recipients open it in any browser — no install required.

---

## Track coordinate system (reference)

```
(CX-SL, CY-TR) ── top straight ──────────── (CX+SL, CY-TR)
      │                                              │
   left curve                                   right curve
   (bulges left)                               (bulges right)
      │                                              │
(CX-SL, CY+TR) ── bottom straight ───────── (CX+SL, CY+TR)
   ↑ 0m (5000m START)                          ↑ 200m (FINISH for all events)
```

- Direction: **counter-clockwise** (top-left → bottom-left → bottom-right → top-right)
- `CX`, `CY` — canvas center (computed dynamically from canvas size)
- `SL` — half-straight length in pixels (scales with screen width)
- `TR` — curve radius in pixels (scales with screen width)
- `PERIM` — total oval perimeter = `4*SL + 2π*TR`

On desktop the canvas is 960×410px. On mobile it scales to fill the screen width proportionally.
