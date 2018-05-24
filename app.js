var express = require("express"),
    app     = express();

app.get("/", function(req, res) {
    res.render("index.ejs");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("theredstonetaco server started! (yes)");
});