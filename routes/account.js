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

module.exports = router;