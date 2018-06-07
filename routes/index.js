var express = require("express");
var router  = express.Router();
var Page    = require("../models/page.js");
var Conversation = require("../models/conversation.js");
var middleware = require("../middleware/index.js");

// GET - root route - '/': redirect to index route
router.get("/", function(req, res) {
    res.redirect("/index");
});

// GET - index - '/:pageTitle': Show page of some route
router.get("/:pageTitle", function(req, res) {
    // find the index page in the database
    Page.findOneAndUpdate({
        title: req.params.pageTitle
    }, {
        $inc: {
            views: 1
        }
    }).populate([
        {
            path: "conversation",
            populate: {
                path: "author",
                model: "User"
            }
        }
    ]).exec(function(err1, finalPage) {
        if (err1) {
            return console.log(err1);
        }
        if (!finalPage) {
            return res.redirect("/");
        }
        // now render page with updated views
        res.render(req.params.pageTitle + "/index.ejs", {
            page: finalPage,
        });
    });
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
            console.log(newConversation);
            foundPage.conversation.push(newConversation);
            foundPage.save();
        });
    });
});

module.exports = router;