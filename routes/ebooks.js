var express = require("express");
var router  = express.Router();
var Ebook   = require("../models/ebook.js"),
    Page    = require("../models/page.js");

// INDEX: to display the ebooks homepage
router.get("/ebooks", function(req, res) {
    Page.findOne({
        title: "ebooks"
    }, function(err1, foundPage) {
        if (err1) {
            console.log(err1);
            return res.redirect("back");
        }
        if (!foundPage) {
            console.log("couldn't find page!");
            return res.redirect("back");
        }
        Ebook.find({}, function(err2, foundEbooks) {
            if (err2) {
                console.log(err2);
                return res.redirect("back");
            }
            if (!foundEbooks) {
                console.log("couldn't find ebooks!");
            }
            res.render("ebooks/index.ejs", {
                page: foundPage,
                ebooks: foundEbooks
            });
        }); 
    });
});

// SHOW: to show an ebook page for READING or BUYING !: D
router.get("/ebooks/:ebookId", function(req, res) {
    Ebook.findByIdAndUpdate(req.params.ebookId, {
        $inc: {
            views: 1
        }
    }, function(err, updatedEbook) {
        if (err) {
            return console.log(err);
        }
        if (!updatedEbook) {
            return console.log("COULDNT UPDATE EBOOK");
        }
    });
    Page.findOne({
        title: "ebooks"
    }, function(err, foundPage) {
        if (err) {
            return console.log(err);
        }
        if (!foundPage) {
            return console.log("COULDNT FIND PAGe");
        }
        Ebook.findById(req.params.ebookId, function(err, foundEbook) {
            if (err) {
                console.log(err);
                return res.redirect("back");
            }
            if (!foundEbook) {
                console.log("couldn't find ebook");
                return res.redirect("back");
            }
            res.render("ebooks/show.ejs", {
                page: foundPage,
                ebook: foundEbook
            });
        });
    });
});

// SHOW: to show for reading, an ebook
router.get("/ebooks/:ebookId/read", function(req, res) {
    Ebook.findById(req.params.ebookId, function(err, foundEbook) {
        if (err) {
            console.log(err);
            return res.redirect("back");
        }
        if (!foundEbook) {
            console.log("coulddndt find ebook");
            return res.redirect("back");
        }
        var initials = foundEbook.title.split(" ").map((n)=>n[0].toLowerCase()).join("");
        res.render("ebooks/" + initials + "/index.ejs", {
            ebook: foundEbook
        });
    });
});

// UPDATE: to like an ebook
router.put("/ebooks/:ebookId/like", function(req, res) {
    Ebook.findById(req.params.ebookId, function(err, foundEbook) {
        if (err) {
            return console.log(err);
        }
        foundEbook.likes ++;
        foundEbook.save();
    });
});
// YOU SMELL
// CREATE: to rate an ebook
router.post("/ebooks/:ebookId/ratings", function(req, res) {
    // find ebook to rate
    Ebook.findById(req.params.ebookId, function(err, foundEbook) {
        if (err) {
            return console.log(err);
        }
        if (!foundEbook) {
            return console.log("CoulNDT find ebook");
        }
        // rate ebook
        foundEbook.ratings.push({
            value: req.body.value / 5.0,
            author: req.user._id
        });
        // update ebook's average rating
        var sum = 0;
        for (var i = 0; i < foundEbook.ratings.length; i++) {
            sum += foundEbook.ratings[i].value;
        }
        var avg = sum / (((foundEbook.ratings.length == 0) * 1) + ((foundEbook.ratings.length != 0) * foundEbook.ratings.length));
        foundEbook.rating = avg;
        // save an ebook
        foundEbook.save();
    });
});

// UPDATE: to update an ebook rating
router.post("/ebooks/:ebookId/ratings/:userId/edit", function(req, res) {
    // find ebook
    Ebook.findById(req.params.ebookId, function(err, foundEbook) {
        if (err) {
            return console.log(err);
        }
        if (!foundEbook) {
            return console.log("Ccouldn't find Ebook");
        }
        // update that one individual rating
        var whichRating = -1;
        for (var i = 0; i < foundEbook.ratings.length; i++) {
            if (foundEbook.ratings[i].author.equals(req.user._id)) {
                whichRating = i;
                break;
            }
        }
        if (whichRating == -1) {
            return console.log("couldn't find a matching rating to the user that tried to edit theirs");
        }
        foundEbook.ratings[whichRating].value = parseInt(req.body.value) / 5.0;
        // update ebook's average rating
        var sum = 0;
        for (var i = 0; i < foundEbook.ratings.length; i++) {
            sum += foundEbook.ratings[i].value;
        }
        var avg = sum / (((foundEbook.ratings.length == 0) * 1) + ((foundEbook.ratings.length != 0) * foundEbook.ratings.length));
        foundEbook.rating = avg;
        // save ebook
        foundEbook.save();
    });
});

// CREATE: to review an ebook
router.post("/ebooks/:ebookId/reviews", function(req, res) {
    
});

// UPDATE: to update a review
router.put("/ebooks/:ebookId/review", function(req, res) {
    
});


// SHOW: to show buy page of an ebook
router.get("/ebooks/:ebookdId/buy", function(req, res) {
    res.send("page under construction");
});

module.exports = router;