// require boilerplate
var passportLocalMongoose   = require("passport-local-mongoose"),
    methodOverride          = require("method-override"),
    LocalStrategy           = require("passport-local"),
    bodyParser              = require("body-parser"),
    passport                = require("passport"),
    mongoose                = require("mongoose"),
    express                 = require("express"),
    Ebook                   = require("./models/ebook.js"),
    User                    = require("./models/user.js"),
    Page                    = require("./models/page.js"),
    app                     = express();


// route requiring
var historyofanythingRoutes = require("./routes/historyofanything.js"),
    authenticationRoutes    = require("./routes/authentication.js"),
    portfolioRoutes         = require("./routes/portfolio.js"),
    accountRoutes           = require("./routes/account.js"),
    indexRoutes             = require("./routes/index.js"),
    ballsRoutes             = require("./routes/balls.js"),
    osRoutes                = require("./routes/os.js");
    


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
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
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
app.use(ballsRoutes);
app.use(historyofanythingRoutes);
app.use(indexRoutes);
app.use(osRoutes);
app.use(portfolioRoutes);



// listen
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("I really love Jesus + theredstonetaco server started >.< [_-}] ?.? (-_||");
});