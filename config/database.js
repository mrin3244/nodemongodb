const MongoClient = require('mongodb').MongoClient;

module.exports = function(callback){
    //create connection on mongodb
    MongoClient.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true }, function(err, db) {
        if(!err){
            console.log('db connected');
        }
        callback(err, db);
    });
}


