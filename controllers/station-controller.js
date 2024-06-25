import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import { conversions } from "../utils/conversions.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const maxTemp = stationAnalytics.getMaxTemp(station);
    const minTemp = stationAnalytics.getMinTemp(station);
    const maxWind = stationAnalytics.getMaxWind(station);
    const minWind = stationAnalytics.getMinWind(station);
    const maxPressure = stationAnalytics.getMaxPressure(station);
    const minPressure = stationAnalytics.getMinPressure(station);
    // const reports = await reportStore.getReportsByStationId(station._id);
    // const latestReading = reports.length > 0 ? reports.slice(-1)[0] : null;
    
    const viewData = {
      title: "Station",
      station: station,
      maxTemp: maxTemp,
      minTemp: minTemp,
      maxWind: maxWind,
      minWind: minWind,
      maxPressure: maxPressure,
      minPressure: minPressure,
      // latestReading: latestReading,
      // currentFahrenheit: conversions.celsiusToFahrenheit(latestReading.temp),
      // windSpeedInBeaufort: conversions.windSpeedToBeaufort(latestReading.windSpeed),
    };
    response.render("station-view", viewData);
  },

  async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReport = {
      code: Number(request.body.code),
      temp: Number(request.body.temp),
      windSpeed: Number(request.body.windSpeed),
      windDirection: request.body.windDirection,
      // windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    await reportStore.addReport(station._id, newReport);
    response.redirect("/station/" + station._id);
  },

  async deleteReport(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`Deleting Report ${reportId} from Station ${stationId}`);
    await reportStore.deleteReport(request.params.reportId);
    response.redirect("/station/" + stationId);
  },
};
