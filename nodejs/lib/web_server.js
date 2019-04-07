'use strict';

const Express = require('express');
const Path = require('path');

const app = Express();
const Http = require('http').Server(app);

// view engine setup
app.set('views', Path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

//static bower dependencies
app.use(Express.static(Path.join(__dirname, '..', 'bower_components')));

// routes
app.get('/', (req, res) => {
  res.render('index');
});

module.exports = Http;
