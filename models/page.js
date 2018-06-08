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

// CHANGE from 1.x: need to pass in mongoose instance
var deepPopulate = require('mongoose-deep-populate')(mongoose);
pageSchema.plugin(deepPopulate);

module.exports = mongoose.model("Page", pageSchema);