var express = require("express");
var router  = express.Router();
var Page    = require("../models/page.js");
var Conversation = require("../models/conversation.js");
var middleware = require("../middleware/index.js");

// CREATE - conversation - '/conversation/:conversationId': create a conversation on another conversation
router.post("/conversation/:conversationId", function(req, res) {
    // create new conversation
    Conversation.create({
        title: req.params.title,
        content: req.params.content,
        category: req.params.category
    }, function(err1, createdConversation) {
        if (err1) {
            return console.log(err1);
        }
        if (!createdConversation) {
            return console.log("couiildnt t t t create conversation!");
        }
        // find conversation to push to
        Conversation.findById(req.params.conversationId, function(err2, foundConversation) {
            if (err2) {
                return console.log(err2);
            }
            if (!foundConversation) {
                return console.log("ADCOULDNTADAD update conversation!");
            }
            // push conversation to array and save
            foundConversation.conversation.push(createdConversation._id);
            foundConversation.save();
            // then redirect back to page!
            res.redirect("back");
        });
    });
});

// POST - conversation - '/conversation/:conversationId/:option': vote on a conversation (yes or no for now)
router.post("/conversation/:conversationId/:option", function(req, res) {
    var option = req.params.option;
    var updater;
    if (option == "yes") {
        updater = { yes: 1 };
    } else if (option == "no") {
        updater = { no: 1 };
    } else {
        return console.log("invalid option in route POST: conversation/" + req.params.conversationId + "/" + option);
    }
    Conversation.findByIdAndUpdate(req.params.conversationId, {
        $inc: updater
    }, function(err1, updatedConversation) {
        if (err1) {
            return console.log(err1);
        }
        if (!updatedConversation) {
            return console.log("couldn't find conversation to update in route POST: conversation/" + req.params.conversationId + "/" + option);
        }
    });
});

// EDIT - conversation: show form to edit a conversation
router.get("/conversation/:conversationId/edit", middleware.isLoggedIn, function(req, res) {
    Page.findOne({
        title: "os"
    }, function(err1, foundPage) {
        if (err1) {
            return console.log(foundPage);
        }
        if (!foundPage) {
            return console.log("couldaNNt find page!");
        }
        // find conversation to be edited
        Conversation.findById(req.params.conversationId).populate("author").exec(function(err2, foundConversation) {
            if (err2) {
                return console.log(err2);
            }
            // only allow owners or high authorization users to edit
            if (!foundConversation.author._id.equals(req.user._id) && req.user.authorization != 1) {
                res.redirect("back");
            }
            // show form
            res.render("conversation/edit.ejs", {
                page: foundPage,
                conversation: foundConversation
            });
        }); 
    });
});

// UPDATE - conversation: update a conversation
router.put("/conversation/:conversationId", middleware.isLoggedIn, function(req, res) {
    // find conversation and update it
    Conversation.findByIdAndUpdate(req.params.conversationId, req.body, function(err1, updatedConversation) {
        if (err1) {
            return console.log(err1);
        }
        if (!updatedConversation) {
            return console.log("Couldnatm update conversation!`");
        }
        // then redirect back!
        res.redirect("/");
    });
});

// GET - conversation but leads to DELETE: show form to delete a conversation 
router.get("/conversation/:conversationId/delete", middleware.isLoggedIn, function(req, res) {
    Page.findOne({
        title: "os"
    }, function(err1, foundPage) {
        if (err1) {
            return console.log(foundPage);
        }
        if (!foundPage) {
            return console.log("couldnnnnnnna find page!");
        }
        // find conversation to be deleted
        Conversation.findById(req.params.conversationId).populate("author").exec(function(err2, foundConversation) {
            if (err2) {
                return console.log(err2);
            }
            // only allow owners or high authorization users to delete
            if (!foundConversation.author._id.equals(req.user._id) && req.user.authorization != 1) {
                res.redirect("back");
            }
            // show form
            res.render("conversation/delete.ejs", {
                page: foundPage,
                conversation: foundConversation
            });
        }); 
    });
});

// DESTROY - conversation: delete a conversation
router.delete("/conversation/:conversationId", middleware.isLoggedIn, function(req, res) {
    // find conversation to be deleted
    Conversation.findById(req.params.conversationId).populate("author").exec(function(err1, foundConversation) {
        if (err1) {
            return console.log(err1);
        }
        // only allow owners or high authorization users to delete
        if (!foundConversation.author._id.equals(req.user._id) && req.user.authorization != 1) {
            res.redirect("back");
        }
        // now delete!
        foundConversation.remove();
        // redirect...
        res.redirect("/");
    }); 
});

module.exports = router;