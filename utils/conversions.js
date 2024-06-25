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
}