// require boilerplate
var passportLocalMongoose   = require("passport-local-mongoose"),
    methodOverride          = require("method-override"),
    LocalStrategy           = require("passport-local").Strategy,
    Conversation            = require("./models/conversation.js"),
    bodyParser              = require("body-parser"),
    passport                = require("passport"),
    mongoose                = require("mongoose"),
    express                 = require("express"),
    Ebook                   = require("./models/ebook.js"),
    User                    = require("./models/user.js"),
    Page                    = require("./models/page.js"),
    app                     = express();


// route requiring
var authenticationRoutes    = require("./routes/authentication.js"),
    accountRoutes           = require("./routes/account.js"),
    ebooksRoutes            = require("./routes/ebooks.js"),
    indexRoutes             = require("./routes/index.js");
    

mongoose.connect("mongodb://theredstonetaco:tacoman123@ds233970.mlab.com:33970/theredstonetaco");

// url parsing
app.use(bodyParser.urlencoded({extended: true}));
// css
app.use(express.static(__dirname + "/public"));
// session
app.use(require("express-session")({
    secret: "1234567890",
    resave: false,
    saveUninitialized: false
}));
// passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
  function(login, password, done) {
    // to login by either username or email
    var findBy;
    if (login.indexOf("@") == -1) {
        findBy = {username: login};
    } else {
        findBy = {email: login};
    }
    // now login
    User.findOne(findBy, function (err, user) {
      if (err) {
          return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (password == user.password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// routes
app.use(function(request, response, next) {
    response.locals.currentUser = request.user;
    next();
});
// method overriding
app.use(methodOverride("_method"));

// route using
app.use(accountRoutes);
app.use(authenticationRoutes);
app.use(ebooksRoutes);
app.use(indexRoutes);

// listen
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("I really love Jesus + theredstonetaco server started >.< [_-}] ?.? (-_||");
});