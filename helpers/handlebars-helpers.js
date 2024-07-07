import dayjs from "dayjs";

export const handlebarsHelpers = {
  convertUnixTimeToStandard: function(unixTime) {
    const standardTime = dayjs.unix(unixTime);
    return standardTime.format("YYYY-MM-DD HH:mm:ss");
  },

  roundToOneDecimalPlace: function(number) {
    return Math.round(number * 10) / 10
  },

  // https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-11.php
  convertCelsiusToFahrenheit(celsius) {
    let fahrenheit = celsius * 9 / 5 + 32;
    return Number(fahrenheit.toFixed(1));
  },

  convertWindSpeedToBeaufort(windSpeed) {
    const thresholds = [0, 1, 7, 12, 20, 30, 40, 51, 63, 76, 88, 103, 118];
    for (let i = 0; i < thresholds.length; i++) {
      if (windSpeed < thresholds[i]) {
        return i;
      }
    }
    return thresholds.length;
  },

  convertDegreesToDirection(degrees) {
    for (const key in degreeDirectionMap) {
      // Gets the start and the end values by splitting the key using "-"
      const [start, end] = key.split("-").map(Number);
      if (start <= degrees && degrees <= end) {
        return degreeDirectionMap[key];
      }
    }
  // Defaults to "N" if no match found
  return "N";
  },
}

const degreeDirectionMap = {
  "348.75-360": "North",
  "0-11.25": "North",
  "11.25-33.75": "North-North East",
  "33.75-56.25": "North-East",
  "56.25-78.75": "East-North East",
  "78.75-101.25": "East",
  "101.25-123.75": "East-South East",
  "123.75-146.25": "South-East",
  "146.25-168.75": "South-South East",
  "168.75-191.25": "Sout",
  "191.25-213.75": "South-South West",
  "213.75-236.25": "South-West",
  "236.25-258.75": "West-South West",
  "258.75-281.25": "West",
  "281.25-303.75": "West-North West",
  "303.75-326.25": "North-West",
  "326.25-348.75": "North-North West"
};