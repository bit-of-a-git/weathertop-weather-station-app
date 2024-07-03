import dayjs from "dayjs";

export const handlebarsHelpers = {
  reverseArray: function(array) {
    return array.slice().reverse();
  },

  unixTimeToStandard: function(unixTime) {
    const standardTime = dayjs.unix(unixTime);
    return standardTime.format("YYYY-MM-DD HH:mm:ss");
  },

  roundToOneDecimalPlace: function(number) {
    return Math.round(number * 10) / 10
  },

  // https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-11.php
  celsiusToFahrenheit(celsius) {
    let fahrenheit = celsius * 9 / 5 + 32;
    return Number(fahrenheit.toFixed(1));
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

  degreesToDirection(degrees) {
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
  "348.75-360": "N",
  "0-11.25": "N",
  "11.25-33.75": "NNE",
  "33.75-56.25": "NE",
  "56.25-78.75": "ENE",
  "78.75-101.25": "E",
  "101.25-123.75": "ESE",
  "123.75-146.25": "SE",
  "146.25-168.75": "SSE",
  "168.75-191.25": "S",
  "191.25-213.75": "SSW",
  "213.75-236.25": "SW",
  "236.25-258.75": "WSW",
  "258.75-281.25": "W",
  "281.25-303.75": "WNW",
  "303.75-326.25": "NW",
  "326.25-348.75": "NNW"
};