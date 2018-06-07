var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    authorization: Number,
    username: String,
    email: String,
    password: String,
    created: String,
    ebooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ebook"
    }],
});

// plugin passportLocalMongoose to add functionality to the model
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);