export const conversions = {
  // https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-11.php

  celsiusToFahrenheit(celsius) {
    let fahrenheit = celsius * 9 / 5 + 32;
    return Number(fahrenheit.toFixed(2));
  },
  
  windSpeedToBeaufort(windSpeed) {
    const thresholds = [0, 1, 7, 12, 20, 30, 40, 51, 63, 76, 88, 103, 118];

    for (let i = 0; i < thresholds.length; i++) {
      if (windSpeed < thresholds[i]) {
        return i;
      }
    }

    return thresholds.length;
  },

  weatherCodeToName(weatherCode) {
    for (const key in weatherCodeMap) {
      // Gets the start and the end values by splitting the key using "-"
      const [start, end] = key.split("-").map(Number);
      if (start <= weatherCode && weatherCode <= end) {
        return weatherCodeMap[key];
      }
    }
  // Defaults to "clear" if no match found
  return "Clear";
  },

  weatherCodeToImage(weatherCode) {
    for (const key in weatherImageMap) {
      // Gets the start and the end values by splitting the key using "-"
      const [start, end] = key.split("-").map(Number);
      if (start <= weatherCode && weatherCode <= end) {
        return weatherImageMap[key];
      }
    }
  // Defaults to "clear" if no match found
  return "13d";
  },
}

const weatherCodeMap = {
  '200-299': 'Thunderstorm',
  '300-399': 'Drizzle',
  '500-599': 'Rain',
  '600-699': 'Snow',
  '701-701': 'Mist',
  '711-711': 'Smoke',
  '721-721': 'Haze',
  '731-731': 'Dust',
  '741-741': 'Fog',
  '751-751': 'Sand',
  '761-761': 'Dust',
  '762-762': 'Ash',
  '771-771': 'Squall',
  '781-781': 'Tornado',
  '800-800': 'Clear',
  '801-804': 'Clouds'
};

const weatherImageMap = {
  '200-299': '11d',
  '300-399': '09d',
  '500-510': '10d',
  '511-511': '13d',
  '520-599': '09d',
  '600-699': '13d',
  '701-701': '50d',
  '800-800': '01d',
  '801-801': '02d',
  '802-802': '03d',
  '803-804': '04d',
};