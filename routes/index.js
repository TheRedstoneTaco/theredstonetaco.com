var express = require("express");
var router  = express.Router();
var Page    = require("../models/page.js");

// GET - root route - '/': redirect to index route
router.get("/", function(req, res) {
    res.redirect("/index");
});

// GET - index - '/:pageTitle': Show page of some route
router.get("/:pageTitle", function(req, res) {
    // find index page info in database
    Page.findOne({
        title: req.params.pageTitle
    }, function(err1, foundPage) {
        if (err1) {
            return console.log(err1);
        }
        if (!foundPage) {
            return res.redirect("/");
        }
        // now that you've visited, update info
        var views = foundPage.views;
        var id = foundPage._id;
        Page.findByIdAndUpdate(id, {
            views: (views + 1)
        }, function(err2, updatedPage) {
            if (err2) {
                return console.log(err2);
            }
            // render page with found and updated info
            res.render(req.params.pageTitle + "/index.ejs", {
                page: updatedPage
            });
        });
    });
});

module.exports = router;