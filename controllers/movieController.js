const axios=require('axios');
const {MOVIES_API_KEY}=process.env;
const errorHandler=require('../utils/errorHandler');

const handleMovie= async (request, response) => {
    let { country } = request.query;
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&region=${country}&api_key=${MOVIES_API_KEY}`
    let resultado;
    try {
        resultado = await axios.get(url);
        let resultadoArray = resultado.data.results.map(p => new Movies(p));
        console.log(resultado);
        response.status(200).send(resultadoArray);
    } catch (error) {
        errorHandler(error, response);
    }
};
function Movies(p) {
    this.title = p.original_title,
    this.overview = p.overview,
    this.average_votes=p.vote_average,
    this.total_votes=p.vote_count,
    this.image_url="https://image.tmdb.org/t/p/w500"+p.poster_path,
    this.popularity=p.popularity,
    this.released_on=p.release_date
}
module.exports={handleMovie, Movies};