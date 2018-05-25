var mongoose = require("mongoose");

var pageSchema = new mongoose.Schema({
    name: String,
    timesViewed: Number,
    timesLiked: Number,
});

module.exports = mongoose.model("Page", pageSchema);