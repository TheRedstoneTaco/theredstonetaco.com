var User     = require("../models/user.js"),
    passport = require("passport"),
    dateTime = require('date-time'),
    Page     = require('../models/page.js');
var express = require("express"),
    router  = express.Router();



// GET - authentication - login: Show page to login
router.get("/login", function(req, res) {
    Page.findOne({
        title: "login"
    }, function(err, foundPage) {
        if (err) {
            console.log(err);
            return res.redirect("back");
        }
        res.render("authentication/login.ejs", {
            page: foundPage
        }); 
    });
});
// POST - authentication - login: Log a user in
router.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
        return next(err);
    }
    if (!user) {
        console.log("user not found in database!");
        return res.redirect('/login');
    }
    req.logIn(user, function(err) {
        if (err) {
            return next(err);
        }
        return res.redirect("/");
    });
  })(req, res, next);
});

// GET - authentication - register: Show page to register
router.get("/register", function(req, res) {
    Page.findOne({
        title: "register"
    }, function(err, foundPage) {
        if (err) {
            console.log(err);
            return res.redirect("back");
        }
        res.render("authentication/register.ejs", {
            page: foundPage
        });
    });
});
// POST - authentication - register: Register a user
router.post("/register", function(req, res) {

    // create temporary, blank user object
    var newUser = new User({
        authorization: 0,
        username: req.body.username,
        email: req.body.email,
        created: 'today',
        ebooks: []
    });
    
    // create new user with object, setup password, register, all that stuff
    User.register(newUser, req.body.password, function(error, registeredUser) {
        
        if (error || !registeredUser) {
            console.log("ERROR in POST: /register trying to create user " + error);
            return res.redirect("/register");
        }
        
        req.login(registeredUser, function (err) {
            if (err) {
                console.log(err);
                return res.redirect("/register");
            }
            res.redirect("/");
        });
    
    });
});



// GET - authentication - logout: Logout a user
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});



module.exports = router;