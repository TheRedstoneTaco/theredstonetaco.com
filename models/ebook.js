var mongoose = require("mongoose");

var ebookSchema = new mongoose.Schema({
    title: String,
    created: String,
    timesBought: Number,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    price: Number,
    ratings: [{
        value: Number,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }],
    rating: Number,
    likes: Number,
    views: Number,
    reviews: [{
        content: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        created: String
    }],
    description: String
});

module.exports = mongoose.model("Ebook", ebookSchema);