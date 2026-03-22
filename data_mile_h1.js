// Tucson Track Club Classic — Mile, Heat 1 + Heat 2 combined
// Date: March 21, 2026
// Track: 400m outdoor
//
// Split points: 400m, 800m, 1200m, 1609m (mile finish)
// All four splits are exactly 400m apart from the mile start.
//
// Mile start offset: 190.656m into the track loop
//   (9.344m to the left of the bottom-right finish corner)
//   Derivation: mile = 1609.344m = 4 laps + 9.344m
//                finish at 200m (bottom-right) → start at 200 - 9.344 = 190.656m
//
// H1 = physical Heat 1 runners (places 1–11)
// H2 = physical Heat 2 runners (places 12–22)
// Positions in splits are combined across both heats (as reported by timing system)
//
// DNS runners (Jake Fell H1, Seanna From H2) excluded.

const SPLIT_DISTANCES = [400, 800, 1200, 1609];

const RACE_START_OFFSET = 190.656; // meters — mile-specific, used by index.html

// Convert "M:SS.mmm" or "SS.mmm" to seconds — used at runtime
function toSeconds(str) {
  const parts = str.split(':');
  if (parts.length === 1) return parseFloat(parts[0]);
  return parseInt(parts[0], 10) * 60 + parseFloat(parts[1]);
}

const runners = [
  {
    place: 1, heat: 'H1',
    name: "Andrew Smock",
    finalTime: "4:35.870",
    cumulative: ["1:08.846", "2:16.450", "3:26.625", "4:35.870"],
  },
  {
    place: 2, heat: 'H1',
    name: "Blake Martin",
    finalTime: "4:56.070",
    cumulative: ["1:11.607", "2:25.891", "3:43.080", "4:56.070"],
  },
  {
    place: 3, heat: 'H1',
    name: "Stephanie Pierce",
    finalTime: "5:02.605",
    cumulative: ["1:11.953", "2:26.748", "3:45.683", "5:02.605"],
  },
  {
    place: 4, heat: 'H1',
    name: "Ryan Burgess",
    finalTime: "5:07.929",
    cumulative: ["1:17.572", "2:36.040", "3:52.855", "5:07.929"],
  },
  {
    place: 5, heat: 'H1',
    name: "Dan Maher",
    finalTime: "5:20.660",
    cumulative: ["1:19.289", "2:41.788", "4:03.649", "5:20.660"],
  },
  {
    place: 6, heat: 'H1',
    name: "Cody Kalinowski",
    finalTime: "5:31.644",
    cumulative: ["1:13.065", "2:36.979", "4:05.771", "5:31.644"],
  },
  {
    place: 7, heat: 'H1',
    name: "Brian Meyer",
    finalTime: "5:33.839",
    cumulative: ["1:20.371", "2:44.536", "4:11.012", "5:33.839"],
  },
  {
    place: 8, heat: 'H1',
    name: "Joshua Shultz",
    finalTime: "5:34.147",
    cumulative: ["1:21.014", "2:45.815", "4:11.902", "5:34.147"],
  },
  {
    place: 9, heat: 'H1',
    name: "Yeil Park",
    finalTime: "5:34.254",
    cumulative: ["1:20.271", "2:45.275", "4:11.817", "5:34.254"],
  },
  {
    place: 10, heat: 'H1',
    name: "Dayton Rabellizsa",
    finalTime: "5:36.601",
    cumulative: ["1:20.592", "2:45.475", "4:12.132", "5:36.601"],
  },
  {
    place: 11, heat: 'H1',
    name: "Cameron Frye",
    finalTime: "6:04.938",
    cumulative: ["1:21.246", "2:48.874", "4:24.300", "6:04.938"],
  },
  {
    place: 12, heat: 'H2',
    name: "Sarah Jackson",
    finalTime: "6:12.862",
    cumulative: ["1:32.188", "3:09.700", "4:45.777", "6:12.862"],
  },
  {
    place: 13, heat: 'H2',
    name: "Krista Germeroth",
    finalTime: "6:31.274",
    cumulative: ["1:36.709", "3:16.162", "4:55.545", "6:31.274"],
  },
  {
    place: 14, heat: 'H2',
    name: "Vadim Ayzenshtat",
    finalTime: "6:38.804",
    cumulative: ["1:33.649", "3:15.117", "4:56.727", "6:38.804"],
  },
  {
    place: 15, heat: 'H2',
    name: "Paul Valentin",
    finalTime: "6:41.426",
    cumulative: ["1:44.539", "3:27.491", "5:05.043", "6:41.426"],
  },
  {
    place: 16, heat: 'H2',
    name: "Chas Hodgdon",
    finalTime: "6:52.825",
    cumulative: ["1:41.032", "3:25.865", "5:08.461", "6:52.825"],
  },
  {
    place: 17, heat: 'H2',
    name: "Arturo Vega-Flores",
    finalTime: "7:00.285",
    cumulative: ["1:49.060", "3:39.944", "5:24.597", "7:00.285"],
  },
  {
    place: 18, heat: 'H2',
    name: "Dylan Osborne",
    finalTime: "7:19.699",
    cumulative: ["1:41.232", "3:30.508", "5:25.305", "7:19.699"],
  },
  {
    place: 19, heat: 'H2',
    name: "Eugene Choi",
    finalTime: "7:31.838",
    cumulative: ["1:44.986", "3:32.042", "5:27.938", "7:31.838"],
  },
  {
    place: 20, heat: 'H2',
    name: "Christina Norris",
    finalTime: "7:38.692",
    cumulative: ["1:55.211", "3:53.765", "5:51.030", "7:38.692"],
  },
  {
    place: 21, heat: 'H2',
    name: "Kylie Allen",
    finalTime: "8:33.821",
    cumulative: ["1:59.324", "4:07.932", "6:22.742", "8:33.821"],
  },
  {
    place: 22, heat: 'H2',
    name: "Frida Rivera Cisneros",
    finalTime: "10:44.251",
    cumulative: ["2:02.720", "4:47.300", "7:49.417", "10:44.251"],
  },
];
