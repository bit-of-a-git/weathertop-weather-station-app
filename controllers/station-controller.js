import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const viewData = {
      title: "Station",
      station: station,
    };
    response.render("station-view", viewData);
  },

  async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReport = {
      code: Number(request.body.code),
      temp: Number(request.body.temp),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    await reportStore.addReport(station._id, newReport);
    response.redirect("/station/" + station._id);
  },

  // async deleteTrack(request, response) {
  //   const playlistId = request.params.playlistid;
  //   const trackId = request.params.trackid;
  //   console.log(`Deleting Track ${trackId} from Playlist ${playlistId}`);
  //   await trackStore.deleteTrack(request.params.trackId);
  //   response.redirect("/playlist/" + playlistId);
  // },
};
