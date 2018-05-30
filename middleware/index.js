var User  = require("../models/user.js"),
    Ebook = require("../models/ebook.js"),
    Page  = require("../models/page.js");

var middlewareObject = {};
    
// to check if a user is logged in
middlewareObject.isLoggedIn = function(request, response, next) {
    if(request.isAuthenticated()){
        return next();
    }
    response.redirect("/login");
};

module.exports = middlewareObject;