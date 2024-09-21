const axios=require('axios');
const {WEATHER_API_KEY,WEATHER_URL}=process.env;
const errorHandler=require('../utils/errorHandler');
const cache=require('../controllers/cache');

const handleWeather=async (request,response)=>{
    
    let { lat, lon } = request.query;
    const url = `${WEATHER_URL}?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}&include=minutely`;
    // configurando mi llave
    const cacheKey=`weather-${lat}-${lon}`;
    
    const weatherData=await cache.getFromCacheOrAPi(cacheKey,async()=>{
        try{
            const response=await axios.get(url);
            return response.data.data.map( day=> new Forecast(day));
        }catch(error){
            errorHandler(error,response);
            return null;
        }
    });
    if(weatherData){
        response.status(200).send(weatherData);
        console.log(cache.getCacheInfo(cacheKey));
    }else{
        errorHandler(error,response);
    }

    // try {
    //     let weatherResponde = await axios.get(url);
    //     console.log(weatherResponde);
    //     //linea 28 da formato a la respuesta de la API WEATHERBIT
    //     const weahterData = weatherResponde.data.data.map(day => new Forecast(day));
    //     console.log(`${weahterData}`);
    //     response.status(200).send(weahterData);
    // } catch (error) {
    //     errorHandler(error, response);
    // }
    
};

function Forecast(day) {
    this.day = day.datetime;
    this.description = day.weather.description;
    this.country_code = day.country_code;
}

module.exports={handleWeather, Forecast};