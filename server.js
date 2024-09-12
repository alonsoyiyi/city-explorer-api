require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = `https://api.weatherbit.io/v2.0/current/weather`;
const PORT = process.env.PORT || 3001;

app.get('/weather', handleWeather);
app.get('/movie',handleMovie);
app.use('*', (request, response) => response.status(404).send('Page not found :C'));

async function handleWeather(request, response) {
    let { latitude, longitude } = request.query;

    try {
        const weatherResponde = await axios.get(`${WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}&include=minutely`);
        const weahterData=weatherResponde.data.map(day => new Forecast(day));
        console.log(weahterData);
        response.status(200).send(weahterData);
    } catch (error) {
        errorHandler(error, response);
    }
}



function Forecast(day) {
    this.day = day.datetime;
    this.description = day.weather.description;
}

function errorHandler(error, response) {
    console.log(error);
    response.status(500).send('Ups, something were wrong');
}

app.listen(PORT, () => console.log(`El servidor esta corriendo en :${PORT}.`));