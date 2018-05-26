var User     = require("../models/user.js"),
    passport = require("passport"),
    dateTime = require('date-time');
var express = require("express"),
    router  = express.Router();



// GET - authentication - login: Show page to login
router.get("/login", function(req, res) {
    res.render("authentication/login.ejs"); 
});
// POST - authentication - login: Log a user in
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function(req, res) {
    console.log(1);
});


// GET - authentication - register: Show page to register
router.get("/register", function(req, res) {
    res.render("authentication/register.ejs"); 
});
// POST - authentication - register: Register a user
router.post("/register", function(req, res) {

    // create temporary, blank user object
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        created: dateTime(),
        ebooks: []
    });

    // create new user with object, setup password, register, all that stuff
    User.register(newUser, req.body.password1, function(error, registeredUser) {
        
        if (error || !registeredUser) {
            console.log("ERROR in POST: /register trying to create user " + error);
            return res.redirect("/register");
        }
        
        req.login(registeredUser, function(err) {
            if (err) {
              console.log(err);
              return res.redirect('/login');
            }
            return res.redirect('/');
        });
        // passport.authenticate("local", {
        //     successRedirect: "/",
        //     failureRedirect: "/login"
        // });
        
    });

});



// GET - authentication - logout: Logout a user
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});



module.exports = router;