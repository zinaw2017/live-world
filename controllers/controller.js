var mongoose= require ('mongoose');
var path= require('path');
var express= require ('express');
var router = express.Router();


var jwt = require('jsonwebtoken');
var User = require('../db/schemas/User.js');
var bodyParser= require('body-parser');

var cookie = require ('cookie');


// to check the login page functionality

router.post('/login', function( req, res){
    var userName= req.body.userName;
    var userPassword= req.body.password;
    models.User.findOne({
         "username": userName,
         "password": userPassword
     }).then((user)=> {
         if(!user){
             return res.status(404).json({
                 message: "User not found ..!",
                 success: false
             });
         } else if(user === null){
             return res.status(404).json({
                 message:"You are not registered yet, please register frist..!"
             });
         }
             const payload = {
                 id: user.id,
                 username: user.username
             };
             var token= jwt.sign(payload, "mySuperSecretSecureKey");

             res.cookie("login", token, {
                 expires: new Date(Date.now()+(86400*14*10000)),
                 maxAge:86400*14*1000,
                 httpOnly:true,
                 secure:false // which in fact reflect not using a secure connection like https
             });

             res.status(200).json({
                 success:true
             });

    })
});


// creating new users connectivity

router.post("api/users", function(req, res){
    models.User.findOne({
        username:req.body.username
    }).then((user)=>{
        if(!user){
            models.User.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                password: req.body.newpassword,
                phone: req.body.phonenumber
            }).then(()=>{
                res.status(200).json({
                    message:'Sucessfully created user.',
                    success: true
                });
            });
        } else {
            res.json({
                message: "Username already exists ...!",
                success: false
            })
        }
    })
})



// Creating HTML Routes

router.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/login", function(req, res){
    res.sendFile(path.json(__dirname, "../public/login.html"));
});

router.get("/register", function(req, res){
    res.sendFile(path.json(_dirname, "../public/register.html"))
})



module.exports= router;



