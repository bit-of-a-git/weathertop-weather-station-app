import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import dayjs from "dayjs";
import { StationAnalytics } from "../models/station-analytics.js";
import axios from "axios";
import { conversions } from "../utils/conversions.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    if (station.reports.length > 0) {
      station.latestReport = station.reports[station.reports.length - 1];
      station.analytics = new StationAnalytics(station);
    }
    else {
      station.latestReport = null;
    }

    const viewData = {
      title: "Station",
      brandSubtitle: `${station.title} Weather Station`,
      station: station,
    };
    response.render("station-view", viewData);
  },

  async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);

    const currentTime = dayjs().unix();
    
    const newReport = {
      code: Number(request.body.code),
      temp: Number(request.body.temp),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
      timestamp: currentTime,
      weatherIcon: conversions.weatherCodeToIcon(request.body.code),
      weatherDescription: conversions.weatherCodeToName(request.body.code),
    };
    await reportStore.addReport(station._id, newReport);
    response.redirect("/station/" + station._id);
  },

  async generateReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    
    await axios.get(
      `${process.env.WEATHER_URL}weather?lat=${station.latitude}&lon=${station.longitude}&units=metric&appid=${process.env.API_KEY}`
    )
    .then(axiosResponse => {
      const weatherData = axiosResponse.data;

      const newReport = {        
        code: weatherData.weather[0].id,
        temp: weatherData.main.temp,
        windSpeed: weatherData.wind.speed,
        windDirection: weatherData.wind.deg,
        pressure: weatherData.main.pressure,
        timestamp: weatherData.dt,
        weatherIcon: weatherData.weather[0].icon,
        weatherDescription: weatherData.weather[0].main,
        feelsLike: weatherData.main.feels_like,
      };
      reportStore.addReport(station._id, newReport);
      response.redirect("/station/" + station._id);
    })
      .catch(error => {
        console.error(error);
      });
    },

  async deleteReport(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`Deleting Report ${reportId} from Station ${stationId}`);
    await reportStore.deleteReport(reportId);
    response.redirect("/station/" + stationId);
  },
};
