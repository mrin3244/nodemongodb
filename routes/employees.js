const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const connectDB = require('../config/database');

router.post('/signup', (req, res, next) => {
    console.log("hi");
    bcrypt.hash(req.body.password, 10, (err,hash) => {
        if(err){
            return res.status(500).json({
                "error": err
            })
        } else {
            console.log(hash);
            const dataset = {
                name: req.body.name,
                empNo: req.body.empNo,
                post: req.body.post,
                userName: req.body.userName,
                password: hash
            }
            connectDB(function(err, client){
                var collection = client.db('mydb').collection('employee');
                collection.insertOne(dataset, function(err, result) {
                    client.close();
                    if(result){
                        return res.status(200).json({"message": "create collection and insert data"});
                    }
                    if(err){
                        return res.status(500).json({"error":err});
                    }
                });
            });
        }
    });
});


router.post('/login', (req, res, next) => {
    connectDB(function(err, client){
        var db = client.db('mydb');
        db.collection('employee').find({"userName": req.body.userName}).toArray(
            function(err, doc){
                if(doc.length < 1){
                    return res.status(401).json({
                        "message":"Auth failed"
                    });
                }
                bcrypt.compare(req.body.password, doc[0].password, (err, result) => {
                    if(err){
                        return res.status(401).json({
                            "message":"Auth failed"
                        });  
                    }
                    if(result){
                        //create token --- start
                        const token = jwt.sign(
                            {
                                "userName": doc[0].userName,
                                "id": doc[0]._id
                            }, 
                            'secret', //process.env.JWT_KEY //'secret'
                            {
                                expiresIn: "1h"
                            }
                        );
                        //create token --- end
                        return res.status(200).json({
                            "message":"Auth successful",
                            "token": token
                        });
                    }
                    return res.status(401).json({
                        "message":"Auth failed"
                    });
                });
            });
    });
    //res.status(500).json({"message": "login router"});
});

module.exports = router;