'use strict';

const express = require('express');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use('/', require('./routes/index.js'));
app.use(errorhandler());

var port = process.env.PORT || 1337;
app.listen(port, ()=> {
  console.log('Express Server 01');
});
