var express = require("express");
var router  = express.Router();
var Page    = require("../models/page.js");
var Conversation = require("../models/conversation.js");
var User         = require('../models/user.js');
var middleware = require("../middleware/index.js");

// SHOW: account, show a user's account page
router.get("/account", middleware.isLoggedIn, function(req, res) {
    // find
    Page.findOne({
        title: 'account'
    }, function(err_1, foundPage) {
        // check
        if (err_1) {
            console.log(err_1);
            return res.redirect('/');
        }
        if (!foundPage) {
            console.log("couldn't find page in /account");
            return res.redirect('/');
        }
        // update
        foundPage.views ++;
        foundPage.save();
        // find
        User.findById(req.user._id, function(err_2, foundUser) {
            // check
            if (err_2) {
                console.log(err_2);
                return res.redirect('/');
            }
            if (!foundUser) {
                console.log("couldn't find user in /account");
                return res.redirect('/');
            }
            // render
            res.render("account/index.ejs", {
                page: foundPage,
                user: foundUser
            }); 
        });
    });
});

// PUT: account - photo, edit a user's photo
router.put('/account/photo', middleware.isLoggedIn, function(req, res) {
    
    User.findById(req.user._id, function(err, foundUser) {
        // check
        if (err) {
            console.log('error');
            console.log(err);
            return res.redirect('back');
        }
        if (!foundUser) {
            console.log("couldn't find user in /account/photo");
            return res.redirect('back');
        }
        // update
        foundUser.photo = req.body.photo;
        foundUser.save();
        // redirect
        res.redirect('/account');
    });
    
});

// PUT: account - username, edit a user's username
router.put('/account/username', middleware.isLoggedIn, function(req, res) {
    
    User.findById(req.user._id, function(err, foundUser) {
        // check
        if (err) {
            console.log('error');
            console.log(err);
            return res.redirect('back');
        }
        if (!foundUser) {
            console.log("couldn't find user in /account/username");
            return res.redirect('back');
        }
        // update
        foundUser.username = req.body.username;
        foundUser.save();
        // redirect
        res.redirect('/account');
    });
    
});

// PUT: account - password, edit a user's password
router.put('/account/password', middleware.isLoggedIn, function(req, res) {
    
    User.findByUsername(req.user.username, function(err, foundUser) {
        // check
        if (err) {
            console.log('error');
            console.log(err);
            return res.redirect('back');
        }
        if (!foundUser) {
            console.log("couldn't find user in /account/password");
            return res.redirect('back');
        }
        // update
        foundUser.setPassword(req.body.password, function(){
            foundUser.save();
            // redirect
            res.redirect('/account');
        });
        foundUser.save();
    });
    
});

module.exports = router;