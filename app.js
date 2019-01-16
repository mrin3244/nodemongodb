const express = require('express');
const bodyparser = require('body-parser');
//const MongoClient = require('mongodb').MongoClient;

const app = express();

const empRoutes = require('./routes/employees');
const homeRoutes = require('./routes/home');

// //create connection on mongodb
// MongoClient.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true }, function(err, db) {
//     if(!err){
//         console.log('db connected');
//     }
// });


// get input from body
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json())

// Routes which should handel request
app.use('/emp', empRoutes);
app.use('/home', homeRoutes);

module.exports = app;



