export class StationAnalytics {
  constructor(station) {
    this.maxTemp = Math.max(...station.reports.map(report => report.temp));
    this.minTemp = Math.min(...station.reports.map(report => report.temp));
    this.maxWind = Math.max(...station.reports.map(report => report.windSpeed));
    this.minWind = Math.min(...station.reports.map(report => report.windSpeed));
    this.maxPressure = Math.max(...station.reports.map(report => report.pressure));
    this.minPressure = Math.min(...station.reports.map(report => report.pressure));
  }
}