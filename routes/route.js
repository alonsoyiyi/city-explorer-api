const express = require('express');
const {handleWeather}=require('../controllers/weatherController');
const {handleMovie}=require('../controllers/movieController');

const router = express.Router();

router.get('/weather',handleWeather);
router.get('/movie',handleMovie);
router.use('*', (request,response)=> response.status(404).send('page not found'));


module.exports = router;























// const MOVIE_KEY = process.env.MOVIES_API_KEY;
// const WEATHER_KEY = process.env.WEATHER_API_KEY;
// const WEATHER_URL = `https://api.weatherbit.io/v2.0/current/weather`;
// router.get('/weather',  async (request, response) => {

//     let { lat, lon } = request.query;
//     const url = `${WEATHER_URL}?lat=${lat}&lon=${lon}&key=${WEATHER_KEY}&include=minutely`;
//     try {
//         let weatherResponde = await axios.get(url);
//         console.log(weatherResponde);
//         //linea 28 da formato a la respuesta de la API WEATHERBIT
//         const weahterData = weatherResponde.data.data.map(day => new Forecast(day));
//         console.log(`${weahterData}`);
//         response.status(200).send(weahterData);
//     } catch (error) {
//         errorHandler(error, response);
//     }
//     });

// router.get('/movie', async (request, response) => {
//     let { country } = request.query;
//     const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&region=${country}&api_key=${MOVIE_KEY}`
//     let resultado;
//     try {
//         resultado = await axios.get(url);
//         let resultadoArray = resultado.data.results.map(p => new Movies(p));
//         console.log(resultado);
//         response.status(200).send(resultadoArray);
//     } catch (error) {
//         errorHandler(error, response);
//     }
// });


