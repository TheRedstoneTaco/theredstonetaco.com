var mongoose = require("mongoose");
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Conversation = require("./conversation.js");

var pageSchema = new mongoose.Schema({
    title: String,
    views: Number,
    likes: Number,
    conversation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    }]
});

module.exports = mongoose.model("Page", pageSchema);