'use strict'

var express = require('express');
var app = express();
var cors = require('cors')

app.use(cors())
app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendfile('./public/index.html')
})

app.listen(3000, function() {
  console.log('Listening on port 3000')
})
