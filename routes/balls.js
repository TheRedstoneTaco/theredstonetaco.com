var express = require("express");
var router  = express.Router();

router.get("/balls", function(req, res) {
    res.render("balls/index.ejs"); 
});

module.exports = router;