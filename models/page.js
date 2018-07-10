var mongoose = require("mongoose");
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Conversation = require("./conversation.js");
var Media = require('./media.js');

var pageSchema = new mongoose.Schema({
    title: String,
    views: Number,
    likes: Number,
    conversation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    }],
    media: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media'
    }]
});

module.exports = mongoose.model("Page", pageSchema);