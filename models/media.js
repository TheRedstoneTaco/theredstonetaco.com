var mongoose = require("mongoose");
var Conversation = require('./conversation.js');

var mediaSchema = new mongoose.Schema({
    type: String,
    title: String,
    src: String,
    previewSrc: String,
    category: String,
    views: Number,
    likes: Number
});

module.exports = mongoose.model("Media", mediaSchema);