import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { engine } from "express-handlebars";
import { router } from "./routes.js";
// This allows custom Handlebars functions to be used
import { handlebarsHelpers } from "./helpers/handlebars-helpers.js";
// Dotenv allows variables to be fetched from a .env file
import 'dotenv/config'

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
// This allows static resources to be served from the "public" folder
app.use(express.static("public"));
app.use(fileUpload());
app.engine(".hbs", engine({ 
  extname: ".hbs",
  helpers: handlebarsHelpers })); // https://stackoverflow.com/questions/38661295/node-express-handlebars-where-to-define-custom-helpers
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use("/", router);

const listener = app.listen(process.env.PORT || 4000, function () {
  console.log(`WeatherTop started on http://localhost:${listener.address().port}`);
});
