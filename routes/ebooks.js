var express = require("express");
var router  = express.Router();

router.get("/ebooks/:book", function(req, res) {
    res.render("ebooks/" + req.params.book + "/index.ejs");
});

module.exports = router;