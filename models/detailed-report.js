import { conversions } from "../utils/conversions.js";

export class DetailedReport {
  constructor(report) {
    this.weatherDescription = conversions.weatherCodeToName(report.code);
    this.weatherImage = conversions.weatherCodeToImage(report.code);
    this.currentFahrenheit = conversions.celsiusToFahrenheit(report.temp);
    this.windSpeedInBeaufort = conversions.windSpeedToBeaufort(report.windSpeed);
    this.windDirection = conversions.degreesToDirection(report.windDirection);
    this.currentPressure = report.pressure;
    this.currentCelsius = report.temp;
  }
}