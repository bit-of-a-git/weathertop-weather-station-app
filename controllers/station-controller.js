import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import dayjs from "dayjs";
import { DetailedReport } from "../models/detailed-report.js"
import { StationAnalytics } from "../models/station-analytics.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    if (station.reports.length > 0) {
      const lastReport = station.reports[station.reports.length - 1];
      station.latestReport = new DetailedReport(lastReport);
      station.analytics = new StationAnalytics(station);
    }
    else {
      station.latestReport = null;
    }

    const viewData = {
      title: "Station",
      station: station,
    };
    response.render("station-view", viewData);
  },

  async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);

    const currentTime = dayjs().format('YYYY-MM-DD HH:MM:ss');
    
    const newReport = {
      code: Number(request.body.code),
      temp: Number(request.body.temp),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
      timestamp: currentTime,
    };
    await reportStore.addReport(station._id, newReport);
    response.redirect("/station/" + station._id);
  },

  async deleteReport(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`Deleting Report ${reportId} from Station ${stationId}`);
    await reportStore.deleteReport(reportId);
    response.redirect("/station/" + stationId);
  },
};
