const express = require('express');
const bodyparser = require('body-parser');

//create app
const app = express();

//parse request of content
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url);

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

//define a simple route
app.get('/',function(req,res){
  res.json({"message":"Welcome to app"});
});

//listen for request
app.listen(3000,function(){
  console.log("server is listening on port 3000");
});