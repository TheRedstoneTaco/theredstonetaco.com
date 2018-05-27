var mongoose = require("mongoose");

var pageSchema = new mongoose.Schema({
    title: String,
    views: Number,
    likes: Number,
});

module.exports = mongoose.model("Page", pageSchema);