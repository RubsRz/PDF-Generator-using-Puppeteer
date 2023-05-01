const express = require('express');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const path = require('path')
const routes = require('./routes');


const puppeteer = require('puppeteer');
// const $ = require('jquery');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));


// Agregar las rutas
app.use('/', routes);


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
