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
  return "https://openweathermap.org/img/wn/03d@2x.png";
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
  '200-299': 'https://openweathermap.org/img/wn/11d@2x.png',
  '300-399': 'https://openweathermap.org/img/wn/09d@2x.png',
  '500-510': 'https://openweathermap.org/img/wn/10d@2x.png',
  '511-511': 'https://openweathermap.org/img/wn/13d@2x.png',
  '520-599': 'https://openweathermap.org/img/wn/09d@2x.png',
  '600-699': 'https://openweathermap.org/img/wn/13d@2x.png',
  '701-701': 'https://openweathermap.org/img/wn/50d@2x.png',
  '800-800': 'https://openweathermap.org/img/wn/01d@2x.png',
  '801-801': 'https://openweathermap.org/img/wn/02d@2x.png',
  '802-802': 'https://openweathermap.org/img/wn/03d@2x.png',
  '803-804': 'https://openweathermap.org/img/wn/04d@2x.png',
};