// races.js — all race datasets for TrackCompare
// Add new races to the RACES array. Each race is self-contained.

function toSeconds(str) {
  const parts = str.split(':');
  if (parts.length === 1) return parseFloat(parts[0]);
  return parseInt(parts[0], 10) * 60 + parseFloat(parts[1]);
}

const RACES = [
  // ─────────────────────────────────────────────────────────
  // 5000m — Heat 1
  // ─────────────────────────────────────────────────────────
  {
    id:           '5k_h1',
    label:        '5000m',
    title:        'Tucson Track Club Classic',
    subtitle:     '5000m  ·  400m Track  ·  March 21, 2026',
    splitDistances: [200, 600, 1000, 1400, 1800, 2200, 2600, 3000, 3400, 3800, 4200, 4600, 5000],
    startOffset:  0,
    runners: [
      {
        place: 1, name: "Beau Pullman", finalTime: "16:49.546",
        cumulative: ["37.738","1:54.364","3:10.837","4:29.448","5:49.003","7:09.970","8:32.786","9:57.013","11:22.073","12:46.798","14:13.823","15:35.935","16:49.546"],
      },
      {
        place: 2, name: "Tucker Creger", finalTime: "17:07.969",
        cumulative: ["38.339","1:54.784","3:11.695","4:31.660","5:53.954","7:16.979","8:42.416","10:07.639","11:34.235","12:59.154","14:25.947","15:52.426","17:07.969"],
      },
      {
        place: 3, name: "Naoya Itatsu", finalTime: "17:11.669",
        cumulative: ["39.390","2:01.985","3:23.275","4:43.299","6:03.063","7:22.984","8:42.104","10:04.014","11:28.459","12:54.181","14:20.700","15:47.474","17:11.669"],
      },
      {
        place: 4, name: "Sailor Hutton", finalTime: "17:20.716",
        cumulative: ["38.620","1:55.063","3:12.023","4:32.283","5:55.708","7:19.757","8:45.559","10:11.387","11:36.891","13:03.657","14:31.526","15:58.579","17:20.716"],
      },
      {
        place: 5, name: "Annie Fuller", finalTime: "18:20.072",
        cumulative: ["41.321","2:09.417","3:39.018","5:08.172","6:37.546","8:07.044","9:36.778","11:05.369","12:36.317","14:04.179","15:34.100","17:00.834","18:20.072"],
      },
      {
        place: 6, name: "Peter Contreras", finalTime: "19:19.260",
        cumulative: ["40.903","2:09.615","3:40.701","5:12.645","6:45.475","8:19.239","9:53.190","11:26.750","13:02.995","14:38.609","16:17.701","17:56.462","19:19.260"],
      },
      {
        place: 7, name: "Brian Meyer", finalTime: "20:44.786",
        cumulative: ["48.051","2:27.247","4:05.240","5:39.857","7:17.872","9:00.154","10:40.797","12:20.030","14:01.172","15:44.329","17:32.922","19:11.189","20:44.786"],
      },
      {
        place: 8, name: "Freddie Sanchez", finalTime: "20:48.075",
        cumulative: ["51.498","2:33.499","4:13.822","5:50.795","7:27.062","9:07.119","10:48.795","12:29.472","14:09.161","15:50.509","17:32.351","19:14.332","20:48.075"],
      },
      {
        place: 9, name: "Thomas Williams", finalTime: "21:29.879",
        cumulative: ["47.847","2:30.390","4:14.559","5:56.416","7:37.651","9:22.079","11:05.734","12:50.115","14:35.408","16:20.391","18:06.148","19:50.510","21:29.879"],
      },
      {
        place: 10, name: "Ryan Denney", finalTime: "21:54.446",
        cumulative: ["48.199","2:22.510","3:59.728","5:38.128","7:19.190","9:00.889","10:48.953","12:38.501","14:30.768","16:24.145","18:17.601","20:09.402","21:54.446"],
      },
      {
        place: 11, name: "Camryn Henderson", finalTime: "22:32.628",
        cumulative: ["52.129","2:36.407","4:24.141","6:10.109","7:59.174","9:47.737","11:37.067","13:27.232","15:17.280","17:07.762","18:59.008","20:49.483","22:32.628"],
      },
      {
        place: 12, name: "Paul Valentin", finalTime: "23:22.483",
        cumulative: ["51.759","2:38.848","4:29.913","6:18.662","8:08.779","9:59.500","11:52.256","13:47.146","15:41.384","17:37.013","19:34.294","21:31.193","23:22.483"],
      },
      {
        place: 13, name: "Payton Henderson", finalTime: "23:58.229",
        cumulative: ["49.261","2:34.260","4:22.092","6:10.652","8:05.278","10:03.672","12:01.615","14:00.497","16:01.537","18:00.652","20:02.109","22:03.389","23:58.229"],
      },
      {
        place: 14, name: "David Wolter", finalTime: "24:09.255",
        cumulative: ["46.086","2:27.111","4:14.907","6:04.789","7:58.884","9:56.619","11:55.033","13:57.353","15:59.064","18:02.465","20:10.998","22:16.823","24:09.255"],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Mile — Heat 1 + Heat 2 combined
  // Start: 190.656m into track loop (9.344m left of bottom-right finish)
  // ─────────────────────────────────────────────────────────
  {
    id:           'mile_h1',
    label:        'Mile',
    title:        'Tucson Track Club Classic',
    subtitle:     'Mile  ·  400m Track  ·  March 21, 2026',
    splitDistances: [400, 800, 1200, 1609],
    startOffset:  190.656,
    runners: [
      {
        place: 1, heat: 'H1', name: "Andrew Smock", finalTime: "4:35.870",
        cumulative: ["1:08.846","2:16.450","3:26.625","4:35.870"],
      },
      {
        place: 2, heat: 'H1', name: "Blake Martin", finalTime: "4:56.070",
        cumulative: ["1:11.607","2:25.891","3:43.080","4:56.070"],
      },
      {
        place: 3, heat: 'H1', name: "Stephanie Pierce", finalTime: "5:02.605",
        cumulative: ["1:11.953","2:26.748","3:45.683","5:02.605"],
      },
      {
        place: 4, heat: 'H1', name: "Ryan Burgess", finalTime: "5:07.929",
        cumulative: ["1:17.572","2:36.040","3:52.855","5:07.929"],
      },
      {
        place: 5, heat: 'H1', name: "Dan Maher", finalTime: "5:20.660",
        cumulative: ["1:19.289","2:41.788","4:03.649","5:20.660"],
      },
      {
        place: 6, heat: 'H1', name: "Cody Kalinowski", finalTime: "5:31.644",
        cumulative: ["1:13.065","2:36.979","4:05.771","5:31.644"],
      },
      {
        place: 7, heat: 'H1', name: "Brian Meyer", finalTime: "5:33.839",
        cumulative: ["1:20.371","2:44.536","4:11.012","5:33.839"],
      },
      {
        place: 8, heat: 'H1', name: "Joshua Shultz", finalTime: "5:34.147",
        cumulative: ["1:21.014","2:45.815","4:11.902","5:34.147"],
      },
      {
        place: 9, heat: 'H1', name: "Yeil Park", finalTime: "5:34.254",
        cumulative: ["1:20.271","2:45.275","4:11.817","5:34.254"],
      },
      {
        place: 10, heat: 'H1', name: "Dayton Rabellizsa", finalTime: "5:36.601",
        cumulative: ["1:20.592","2:45.475","4:12.132","5:36.601"],
      },
      {
        place: 11, heat: 'H1', name: "Cameron Frye", finalTime: "6:04.938",
        cumulative: ["1:21.246","2:48.874","4:24.300","6:04.938"],
      },
      {
        place: 12, heat: 'H2', name: "Sarah Jackson", finalTime: "6:12.862",
        cumulative: ["1:32.188","3:09.700","4:45.777","6:12.862"],
      },
      {
        place: 13, heat: 'H2', name: "Krista Germeroth", finalTime: "6:31.274",
        cumulative: ["1:36.709","3:16.162","4:55.545","6:31.274"],
      },
      {
        place: 14, heat: 'H2', name: "Vadim Ayzenshtat", finalTime: "6:38.804",
        cumulative: ["1:33.649","3:15.117","4:56.727","6:38.804"],
      },
      {
        place: 15, heat: 'H2', name: "Paul Valentin", finalTime: "6:41.426",
        cumulative: ["1:44.539","3:27.491","5:05.043","6:41.426"],
      },
      {
        place: 16, heat: 'H2', name: "Chas Hodgdon", finalTime: "6:52.825",
        cumulative: ["1:41.032","3:25.865","5:08.461","6:52.825"],
      },
      {
        place: 17, heat: 'H2', name: "Arturo Vega-Flores", finalTime: "7:00.285",
        cumulative: ["1:49.060","3:39.944","5:24.597","7:00.285"],
      },
      {
        place: 18, heat: 'H2', name: "Dylan Osborne", finalTime: "7:19.699",
        cumulative: ["1:41.232","3:30.508","5:25.305","7:19.699"],
      },
      {
        place: 19, heat: 'H2', name: "Eugene Choi", finalTime: "7:31.838",
        cumulative: ["1:44.986","3:32.042","5:27.938","7:31.838"],
      },
      {
        place: 20, heat: 'H2', name: "Christina Norris", finalTime: "7:38.692",
        cumulative: ["1:55.211","3:53.765","5:51.030","7:38.692"],
      },
      {
        place: 21, heat: 'H2', name: "Kylie Allen", finalTime: "8:33.821",
        cumulative: ["1:59.324","4:07.932","6:22.742","8:33.821"],
      },
      {
        place: 22, heat: 'H2', name: "Frida Rivera Cisneros", finalTime: "10:44.251",
        cumulative: ["2:02.720","4:47.300","7:49.417","10:44.251"],
      },
    ],
  },
];
