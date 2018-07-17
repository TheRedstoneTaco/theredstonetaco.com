var express = require("express");
var router  = express.Router();
var Page    = require("../models/page.js");
var Conversation = require("../models/conversation.js");
var User = require('../models/user.js');
var middleware = require("../middleware/index.js");
var dirtyJSON = require('dirty-json');

// GET - root route - '/': redirect to index route
router.get("/", function(req, res) {
    res.redirect("/index");
});

// GET - index - '/:pageTitle': Show page of some route
router.get("/:pageTitle", function(req, res) {
    Page.findOne({
        title: req.params.pageTitle
    }, function(err_1, foundPage) {
        if (err_1) {
            console.log(err_1);
            res.send("please send this error to ghostofmmo@gmail.com : ", err_1);
        }
        if (!foundPage) {
            res.send("couldn't find page!");
            return console.log("      c      ouldnt find page!");
        }
        foundPage.views ++;
        foundPage.save();
        // recursive population function
        function recursor(obj) {
            obj.populate("conversation", function(err_2, p1) {
                obj.populate("author", function(err_3, p2) {
                    obj.conversation.forEach(function(conversation) {
                        recursor(conversation);
                    });
                });
            });
        }
        // recursively populate the page's nested conversation array
        recursor(foundPage);
        // when we are PROBABLY finished grabbing and populating from the database
        setTimeout(function() {
            foundPage.populate('media', function(err_2, mediaPopulatedPage) {
                // render!
                var finalPage = mediaPopulatedPage;
                if (finalPage.media.length > 0) {
                    finalPage.media = dirtyJSON.parse(finalPage.media);
                } else {
                    finalPage.media = [];
                }
                res.render(req.params.pageTitle + "/index.ejs", {
                    page: finalPage
                });
            });
        }, 750, req, res);
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
            foundPage.conversation.push(newConversation);
            foundPage.save();
        });
    });
});

module.exports = router;