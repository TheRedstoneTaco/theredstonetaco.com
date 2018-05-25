var mongoose = require("mongoose");

var ebookSchema = new mongoose.Schema({
    name: String,
    created: String,
    timesBought: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

module.exports = mongoose.model("Ebook", ebookSchema);