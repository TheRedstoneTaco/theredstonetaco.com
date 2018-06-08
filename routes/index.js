var express = require("express");
var router  = express.Router();
var Page    = require("../models/page.js");
var Conversation = require("../models/conversation.js");
var middleware = require("../middleware/index.js");
var mdp = require("mongoose-deep-populate");

// GET - root route - '/': redirect to index route
router.get("/", function(req, res) {
    res.redirect("/index");
});

// GET - index - '/:pageTitle': Show page of some route
router.get("/:pageTitle", function(req, res) {
    Page.findOne({
        title: req.params.pageTitle
    }).deepPopulate("conversation").then(function(err1, foundPage) {
        console.log(foundPage);
        Page.findOne({
            title: req.params.pageTitle
        }).populate("conversation").exec(function(err1, foundPage) {
            console.log(foundPage);
        });
        res.render(req.params.pageTitle + "/index.ejs", {
            page: foundPage
        });
    });
    // // find the index page in the database and increment "views"
    // Page.findOne({
    //     title: req.params.pageTitle
    // }).deepPopulate("conversation").exec(function(err1, foundPage) {
    //     if (err1) {
    //         console.log(err1);
    //         return res.redirect("/");
    //     }
    //     if (!foundPage) {
    //         console.log("Couldnt find page, itssss not found!! :/");
    //         return res.redirect("/");
    //     }
    //     // increment "views" on visit
    //     foundPage.views ++;
    //     foundPage.save();
    //     // now render final page
    //     console.log("0: " + foundPage);
    //     res.render(req.params.pageTitle + "/index.ejs", {
    //         page: foundPage
    //     });
    // });
});

// PUT - index - '/:pageTitle/like': like a page
router.put("/:pageTitle/like", function(req, res) {
    Page.findOne({
        title: req.params.pageTitle
    }, function(err1, foundPage) {
        if (err1) {
            return console.log("err1: " + err1);
        }
        if (!foundPage) {
            console.log("didn't find page");
        }
        var likes = foundPage.likes;
        Page.findByIdAndUpdate(foundPage._id, {
           likes: (likes + 1) 
        }, function(err2, updatedPage) {
            if (err2) {
                return console.log("err2: " + err2);
            }
            if (!updatedPage) {
                console.log("didn't find page to update");
            }
        });
    });
     
});

// POST - index - '/:pageTitle/conversation': add conversation to a page
router.post("/:pageTitle/conversation", middleware.isLoggedIn, function(req, res) {
    // find page to update
    Page.findOne({
        title: req.params.pageTitle
    }, function(err1, foundPage) {
        if (err1) {
            return console.log(err1);
        }
        // add conversation to the page!
        var newConversation = Conversation.create({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            author: req.user._id,
            yes: 0,
            no: 0
        }, function(err2, newConversation) {
            if (err2) {
                return console.log(err2);
            }
            foundPage.conversation.push(newConversation);
            foundPage.save();
        });
    });
});

module.exports = router;