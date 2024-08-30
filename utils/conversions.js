export const conversions = {

  // https://github.com/bit-of-a-git/whether-weather-app/blob/main/js/utilities/getImageSource.js
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

  weatherCodeToIcon(weatherCode) {
    for (const key in weatherIconMap) {
      // Gets the start and the end values by splitting the key using "-"
      const [start, end] = key.split("-").map(Number);
      if (start <= weatherCode && weatherCode <= end) {
        return weatherIconMap[key];
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

const weatherIconMap = {
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