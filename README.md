# WeatherTop App - David O' Connor

## Table of Contents
- [About the project](#about-the-project)
- [Features](#features)
- [Dependencies](#dependencies)
- [Installation](#installing-the-project-locally)
- [Using the app](#using-the-app)
- [Credits](#credits)

## About the project

This weather station app allows users to input weather station locations, manually or automatically generate weather reports, and view current weather and trends. An account is required to use this application, and users can only see stations they have entered. The tech stack includes Node.js, Express.js, OpenWeatherMap API, Handlebars, Leaflet, and Frappe. Deployed on Glitch.

## Features

- Users can choose to manually enter reports or automatically fetch them from OpenWeatherAPI.
- Users can view trends for temperature, humidity, and wind, using Frappe.
- Users can view their stations collectively or individually on a map, using Leaflet.

## Dependencies
Node.js and npm are required. Package dependencies are found in package.json.

## Installing the project locally

To run the project locally, you must first create an account with [OpenWeatherMap](https://openweathermap.org/) and get an API key. Next...

```bash
# Clone the repo
git clone https://github.com/bit-of-a-git/weathertop-weather-station-app.git

# Navigate to the project directory
cd weathertop-weather-station-app

# Create an .env file
touch .env

# Open the env file using your chosen text editor
# Populate using your API key and the correct URL to fetch data from.
# Make sure the URL ends with a forward slash
# e.g. https://api.openweathermap.org/data/2.5/

API_KEY="YOUR_API_KEY_HERE"
WEATHER_URL="YOUR_WEATHER_URL_HERE"

# Install dependencies
npm install

# Start the project
npm start
```

You should see a message informing you that the app has started on http://localhost:4000. Click this and you will be brought to the front page, which will allow you to sign up or log in.

## Using the app

Whether running locally or using the deployed Glitch link, click "sign up" to set up an account and log in. You may now add stations by entering a name, a latitude, and a longitude. Once you do so you will see a dashboard for your station in addition to a map showing its location.

Next, click the blue icon under your station to go to the station view. Here you can see five day trends for your location fetched automatically from OpenWeatherMap API. You can manually create a weather report for the location by inputting weather code, temperature, wind speed, wind direction, and pressure. Alternatively, you can select the red button labelled "Auto-Generate Report" to automatically fetch a weather report from your selected location.

Users can delete reports by clicking the red button to the right of each listed report. Users may also edit and update their accounts by clicking the icon on the top right of the screen and clicking "edit profile".

## Credits

Icons were taken from https://icon-sets.iconify.design.

Images were taken from the following sources:
- https://citizenside.com/wp-content/uploads/2023/08/what-do-the-iphone-weather-symbols-mean-1691610674.jpg
- https://www.freeimages.com/photo/weather-station-1243730
- https://www.freepik.com/free-vector/weather-icons-collection_1044316.htm
- https://unblast.com/wp-content/uploads/2018/06/Weather-Icons.jpg

Former SETU student Eoin Fennessy's project was extremely helpful for getting ideas on things like how to implement charts, update user settings, or get max/min values from reports.
- https://github.com/eoinfennessy/weathertop-node

Other pages which were referenced during development are included below:

- https://bulma.io/documentation/components/modal/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
- https://dev.to/rthefounding/using-the-map-method-to-extract-data-from-an-array-h5k
- https://www.freecodecamp.org/news/how-to-sort-array-of-objects-by-property-name-in-javascript/
- https://github.com/bit-of-a-git/whether-weather-app/blob/main/js/utilities/getImageSource.js
- https://stackoverflow.com/questions/16845614/zoom-to-fit-all-markers-in-mapbox-or-leaflet
- https://stackoverflow.com/questions/38661295/node-express-handlebars-where-to-define-custom-helpers
- https://stackoverflow.com/questions/46785393/bulma-dropdown-not-working
- https://stackoverflow.com/questions/48992610/how-to-give-gaps-in-x-axis-in-frappe-charts
- https://stackoverflow.com/questions/7342957/how-do-you-round-to-one-decimal-place-in-javascript
- https://stackoverflow.com/questions/8128911/quantized-level-method
- https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-11.php