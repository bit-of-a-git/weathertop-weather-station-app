export const stationAnalytics = {
  getMaxTemp(station) {
    let maxTemp = null;
    if (station.reports.length > 0) {
      maxTemp = station.reports[0].temp;
      for (let i = 1; i < station.reports.length; i++) {
        if (station.reports[i].temp > maxTemp) {
          maxTemp = station.reports[i].temp;
        }
      }
    }
    return maxTemp;
  },

  getMinTemp(station) {
    let minTemp = null;
    if (station.reports.length > 0) {
      minTemp = station.reports[0].temp;
      for (let i = 1; i < station.reports.length; i++) {
        if (station.reports[i].temp < minTemp) {
          minTemp = station.reports[i].temp;
        }
      }
    }
    return minTemp;
  },

  getMaxWind(station) {
    let maxWind = null;
    if (station.reports.length > 0) {
      maxWind = station.reports[0].windSpeed;
      for (let i = 1; i < station.reports.length; i++) {
        if (station.reports[i].windSpeed > maxWind) {
          maxWind = station.reports[i].windSpeed;
        }
      }
    }
    return maxWind;
  },

  getMinWind(station) {
    let minWind = null;
    if (station.reports.length > 0) {
      minWind = station.reports[0].windSpeed;
      for (let i = 1; i < station.reports.length; i++) {
        if (station.reports[i].windSpeed < minWind) {
          minWind = station.reports[i].windSpeed;
        }
      }
    }
    return minWind;
  },

  getMaxPressure(station) {
    let maxPressure = null;
    if (station.reports.length > 0) {
      maxPressure = station.reports[0].pressure;
      for (let i = 1; i < station.reports.length; i++) {
        if (station.reports[i].pressure > maxPressure) {
          maxPressure = station.reports[i].pressure;
        }
      }
    }
    return maxPressure;
  },

  getMinPressure(station) {
    let minPressure = null;
    if (station.reports.length > 0) {
      minPressure = station.reports[0].pressure;
      for (let i = 1; i < station.reports.length; i++) {
        if (station.reports[i].pressure < minPressure) {
          minPressure = station.reports[i].pressure;
        }
      }
    }
    return minPressure;
  },
}