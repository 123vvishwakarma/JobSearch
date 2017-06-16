var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');
var fs = require('fs');
var connect = require('connect');
var bodyParser = require('body-parser');


app.schema = {};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'images')));

app.crud = require('./curdOperation/crud');
var connection = mongoose.connect(config.MONGO_URI);
  mongoose.connection.on('error', function(err) {
      console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
  }); 
app.set('port', process.env.PORT || 3000);
require('./route.js')(app);
require('./models.js')(app, mongoose);


var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

