// creating three different handleer to handle registeration, sign in and login required
' user strict';
var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt= require('bcrypt'),
    User= mongoose.model('User');

exports.register= function(req, res){
    var User= {
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "username": req.body.username,
        "email": req.body.email,
        "password":req.body.password,
        "phonenumber": req.body.phonenumber,
        "date": req.body.date,
    };
    var newUser= new User(req.body);
    newUser.hash_password= bcrypt.hashSync(req.body.password, 10);  // the hash password is saved in the database using vcrypt
    newUser.save(function(err, user){
        if(err){
            return res.status(404).send({message:err});
        }else {
            user.hash_password= undefined;
            return res.json(user);
        }
    });
};
exports.sign_in= function(req, res){
    User.findOne({
        //email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }, function(err, user){
        if(err) throw err;
        if(!user){
            res.status(404).json({message: 'Authentication failed. User not found ...!'});
        }else if(user){
            if(!user.comparePassword(req.body.password)){
                res.status(404).json({message:'Authentication failed. Wrong password ...!'});
            }else if (user||password === null){
                res.status(401).json({message:"You are not registered yet, please register first ...!"})
            }else {
                return res.send('Sucessfully logged in...!')
            }
        }

    });
};
exports.loginRequired= function(req, res, next){
    if(req.user){
        next();
        window.location.href = '/.......' // to the mainpage..... a page named as like mainpage.html
    } else {
        return res.status(404).json({message: 'Unauthorized user ...please signin first !'});
        window.location.href = '/....' // to the signin page that every user suppose to signed in like sign.html
    }
};


/*

// to put as a route
 module.exports = function(app){
    var userControllerRoute= require('../controllers/userController.js');
    app.route('/auth/register')
        .post(userControllerRoute.register);
    app.route('/auth/sign_in')
        .post(userControllerRoute.sign_in); //usercontrollerRoute is a user handler
}

*/