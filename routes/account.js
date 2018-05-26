var express = require("express");
var router  = express.Router();

router.get("/account", function(req, res) {
    res.render("account/index.ejs"); 
});

module.exports = router;