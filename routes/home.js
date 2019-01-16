const express = require('express');
const router = express.Router();

const connectDB = require('../config/database');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
    connectDB(function(err, client){
        var db = client.db('mydb');
        db.collection('employee').find().toArray(function(err, docs){
            client.close();
            if(docs){
                res.status(200).json(docs);
            }
            if(err){
                return res,status(500).json({"error":err});
            }
        
        });
    });
    
});


router.get('/:eId', checkAuth, (req, res, next) => {
    var eId = require('mongodb').ObjectID(req.params.eId);
    connectDB(function(err, client){
        var db = client.db('mydb');
        //console.log("eid : "+eId);
        var collection = db.collection('employee');
        collection.find({"_id":eId}).toArray(function(err, doc){
            client.close();
            if(doc){
                //console.log(doc);
                res.status(200).json(doc);
            }
            if(err){
                return res,status(500).json({"error":err});
            }
        });
    });
});


router.patch('/:eId', checkAuth, (req, res, next) => {
    var eId = require('mongodb').ObjectID(req.params.eId);

    connectDB(function(err, client){
        var db = client.db('mydb');
        //console.log("eid : "+eId);
        var collection = db.collection('employee');
        collection.updateOne({"_id":eId}, {$set: req.body}, function(err,result){
            client.close();
            if(result){
                return res.status(200).json({"message":"update account "+eId});
            } 
            if(err){
                return res.status(500).json({"error":err});
            }
        });
    });
});


router.delete('/:eId', checkAuth, (req, res, next) => {
    var eId = require('mongodb').ObjectID(req.params.eId);
    connectDB(function(err, client){
        var db = client.db('mydb');
        //console.log("eid : "+eId);
        var collection = db.collection('employee');
        collection.deleteOne({"_id":eId},function(err,result){
            client.close();
            if(result){
                return res.status(200).json({"message":"delete account "+eId});
            } 
            if(err){
                return res.status(500).json({"error":err});
            }
        });
    });
});

module.exports = router;