var mongoose = require("mongoose"),
    express  = require("express"),
    app      = express();

mongoose.connect("mongodb://theredstonetaco:tacoman123@ds233970.mlab.com:33970/theredstonetaco");

app.get("/", function(req, res) {
    res.render("index.ejs");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("theredstonetaco server started! (yes)");
});