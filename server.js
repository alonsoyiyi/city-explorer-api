require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes=require('./routes/route');
const cache=require('./controllers/cache');

const app = express();
app.use(cors());
// configurando middleware
app.use((request,response,next)=>{
    request.cache=cache;
    next();
})
//======================================
// definimos PORT
const PORT = process.env.PORT || 3001;
//=====================================
// definimos route 
app.use(routes);
// app.use('*', (request, response) => response.status(404).send('Page not found :C'));
//===========================================================
// puerto donde escucha el server
app.listen(PORT, () => console.log(`El servidor esta corriendo en :${PORT}.`));