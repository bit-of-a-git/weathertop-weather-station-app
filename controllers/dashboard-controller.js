import { stationStore } from "../models/station-store.js";
import { accountController } from "./account-controller.js";
import { StationAnalytics } from "../models/station-analytics.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountController.getLoggedInUser(request);
    const stations = await stationStore.getStationsByUserId(loggedInUser._id);

    for (let station of stations) {
      if (station.reports.length > 0) {
        station.latestReport = station.reports[station.reports.length - 1];
        station.analytics = new StationAnalytics(station);
      }
      else {
        station.latestReport = null;
      }
    }

    // https://www.freecodecamp.org/news/how-to-sort-array-of-objects-by-property-name-in-javascript/
    stations.sort((a, b) => a.title.localeCompare(b.title));

    const viewData = {
      title: `${loggedInUser.firstName}'s Dashboard`,
      stations: stations,
      titleLink: "/dashboard"
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const loggedInUser = await accountController.getLoggedInUser(request);
    const newStation = {
      title: request.body.title,
      latitude: Number(request.body.latitude),
      longitude: Number(request.body.longitude),
      userid: loggedInUser._id,
    };
    console.log(`adding station ${newStation.title}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  async deleteStation(request, response) {
    const StationId = request.params.id;
    console.log(`Deleting Playlist ${StationId}`);
    await stationStore.deleteStationById(StationId);
    response.redirect("/dashboard");
  },
};
