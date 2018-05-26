var express = require("express");
var router  = express.Router();

router.get("/historyofanything", function(request, response) {
    response.render("historyofanything/index.ejs"); 
});

module.exports = router;