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
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      station.reports.sort((a, b) => b.timestamp - a.timestamp);

      station.latestReport = station.reports[station.reports.length - 1];
      station.analytics = new StationAnalytics(station);
    } else {
      station.latestReport = null;
    }

    const fiveDayForecast = await axios.get(
      `${process.env.WEATHER_URL}forecast?lat=${station.latitude}&lon=${station.longitude}&units=metric&appid=${process.env.API_KEY}`
    );
    const viewData = {
      title: "Station",
      brandSubtitle: `${station.title} Weather Station`,
      station: station,
      titleLink: "/dashboard",
      
      // https://dev.to/rthefounding/using-the-map-method-to-extract-data-from-an-array-h5k
      labels: fiveDayForecast.data.list.map(forecast => forecast.dt_txt),
      temps: fiveDayForecast.data.list.map(forecast => forecast.main.temp),
      humidities: fiveDayForecast.data.list.map(forecast => forecast.main.humidity),
      winds: fiveDayForecast.data.list.map(forecast => forecast.wind.speed),
    };
    response.render("station-view", viewData);
  },

  async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);

    // Decided to fetch time as epoch time as the API also returns it this way
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

    const result = await axios.get(
      `${process.env.WEATHER_URL}weather?lat=${station.latitude}&lon=${station.longitude}&units=metric&appid=${process.env.API_KEY}`
    );
    if (result.status == 200) {
      const weatherData = result.data;

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
    }
  },

  async deleteReport(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`Deleting Report ${reportId} from Station ${stationId}`);
    await reportStore.deleteReport(reportId);
    response.redirect("/station/" + stationId);
  },
};
