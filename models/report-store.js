import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("reports");

export const reportStore = {
  async getAllReports() {
    await db.read();
    return db.data.reports;
  },

  async addReport(stationId, report) {
    await db.read();
    report._id = v4();
    report.stationId = stationId;
    db.data.reports.push(report);
    await db.write();
    return report;
  },

  async getReportsByStationId(id) {
    await db.read();
    return db.data.reports.filter((report) => report.stationId === id);
  },

  async getReportById(id) {
    await db.read();
    return db.data.reports.find((report) => report._id === id);
  },

  // async deleteTrack(id) {
  //   await db.read();
  //   const index = db.data.tracks.findIndex((track) => track._id === id);
  //   db.data.tracks.splice(index, 1);
  //   await db.write();
  // },

  // async deleteAllTracks() {
  //   db.data.tracks = [];
  //   await db.write();
  // },

  async updateReport(report, updatedReport) {
    report.code = updatedReport.code;
    report.temp = updatedReport.temp;
    report.windSpeed = updatedReport.windSpeed;
    report.windDirection = updatedReport.windDirection;
    report.pressure = updatedReport.pressure;
    await db.write();
  },
};
