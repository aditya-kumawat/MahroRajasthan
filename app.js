// setup
var express = require('express');
var favicon = require('serve-favicon');
var exphbs  = require('express-handlebars');
var request = require('request');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({secret: "itsASecret"}));

// Use the public folder as the starting point for src tags in our views
app.use(express.static(path.join(__dirname, 'public')));

// Set the path directory for view templates
app.set('views', __dirname + '/public/views');

// Set path for favicon
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/public/views'));

var http = require('http').Server(app);

http.listen('5000', function(err){
    if(err)
        console.log(err);
    else
        console.log("Connected to port 5000.");
});

mongoose.connect('mongodb://127.0.0.1:27017/mahroRajasthan', function(err) {
    if(err) {
        console.log("Failed to connect to database");
    } else {
        console.log("Connected to the database");
    }
});

var User = require('./models/user');

app.get('/', function(req, res) {
    res.sendFile( app.get('views') + '/index.html');
});
app.get('/login', function(req, res) {
    res.sendFile(app.get('views') + '/login.html');
});
app.get('/verify', function(req, res) {
    res.sendFile(app.get('views') + '/verify.html');
});
app.get('/details', function(req, res){
    res.sendFile( app.get('views') + '/details.html');
});


app.post('/api/login', function(req, res) {
    var data = req.body.mobileNo;
    var user = new User();
    user.mobileNo = data;
    user.save(function(err) {
        if(err) {
            console.log(err);
            res.redirect('/login');
        } else {
            req.session.mobileNo = data;
            res.redirect('/verify');
        }
    });
});
app.post('/api/verify', function(req, res) {
    var data = req.body.otp;
    User.findOne({mobileNo: req.session.mobileNo}, function(err, user) {
        if(err) {
            console.log(err);
            res.redirect('/verify');
        } else {
            console.log(user);
            if(user.otp==data) {
                res.redirect('/details');
            } else {
                res.redirect('/verify');
            }
        }
    });
});
app.post('/api/details', function(req, res) {
    var data = req.body;
    var tour = new Tour();
    if(data) {
        if(data.gender) {
            tour.gender = data.gender;
        }
        if(data.age) {
            tour.age = data.age;
        }
        tour.save(function(err) {
            if(err) {
                console.log(err);
                res.redirect('/details');
            }
        })
    }
    res.redirect('/');
})

app.post('/postdetails', function(req, res){
    console.log(req.body);
    res.send("ab aage kya karna hai");
});

app.get('/map', function(req, res){
    res.sendFile( app.get('views') + '/map.html');
});