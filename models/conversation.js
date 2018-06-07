var mongoose = require("mongoose");

var conversationSchema = new mongoose.Schema({
    title: String,
    category: String,
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    },
    yes: Number,
    no: Number,
    conversation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    }]
});

module.exports = mongoose.model("Conversation", conversationSchema);