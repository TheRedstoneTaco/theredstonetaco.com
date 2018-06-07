var mongoose = require("mongoose");

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