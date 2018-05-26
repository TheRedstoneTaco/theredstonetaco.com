var express = require("express");
var router  = express.Router();

router.get("/portfolio", function(request, response) {
    response.render("portfolio/index.ejs"); 
});

module.exports = router;