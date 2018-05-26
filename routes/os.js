var express = require("express");
var router  = express.Router();

router.get("/os", function(request, response) {
    response.render("os/index.ejs"); 
});

module.exports = router;