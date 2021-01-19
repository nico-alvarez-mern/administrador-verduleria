require('dotenv').config();
const express = require('express');
const cors = require('cors');
const moment = require('moment-timezone');
require('./dbConexion')();
const app = express();

moment.tz('America/Argentina/Buenos_Aires').format();

app.use( express.json() );

app.use(cors());

app.use('/api/v1', require('./rutas/routerApp') );

app.listen(4000, ()=> console.log('Server on'));

module.exports = app;