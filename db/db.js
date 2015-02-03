var mongoose = require('mongoose');
var config = require('../server/config.js');

var dbPath = config.localDevDb;

if(process.env.NODE_ENV === 'production'){
  dbPath = config.remoteProdDb;
}

mongoose.connect(dbPath);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){ console.log('Mongodb connection is open!')});

module.exports = db;
