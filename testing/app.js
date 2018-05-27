var passportLocalMongoose   = require("passport-local-mongoose"),
    LocalStrategy           = require("passport-local").Strategy,
    bodyParser              = require("body-parser"),
    passport                = require("passport"),
    mongoose                = require("mongoose"),
    express                 = require("express"),
    app                     = express();

var userSchema = new mongoose.Schema({
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
var User = mongoose.model("User", userSchema);

// database
mongoose.connect("mongodb://theredstonetaco:tacoman123@ds233970.mlab.com:33970/theredstonetaco");
// url parsing
app.use(bodyParser.urlencoded({extended: true}));
// css
app.use(express.static(__dirname + "/public"));
// session
app.use(require("express-session")({
    secret: "123456789",
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
    console.log(findBy);
    // now login
    User.findOne(findBy, function (err, user) {
        console.log(user);
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


// GET - authentication - register: Show form to register a user
app.get("/register", function(req, res) {
    res.render("register.ejs"); 
});
// POST - authentication - register: Register a user
app.post("/register", function(req, res) {

    // create temporary, blank user object
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        created: 'today',
        ebooks: []
    });

    // create new user with object, setup password, register, all that stuff
    User.register(newUser, req.body.password, function(error, registeredUser) {
        
        if (error || !registeredUser) {
            console.log("ERROR in POST: /register trying to create user " + error);
            return res.redirect("/register");
        }
        
        req.login(registeredUser, function (err) {
            if (err) {
                console.log(err);
                return res.redirect("/register");
            }
            res.redirect("/");
        });
    
    });
});
// GET - authentication - login: Show page to login
app.get("/login", function(req, res) {
    res.render("login.ejs"); 
});
// POST - authentication - login: Log a user in
app.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
        return next(err);
    }
    if (!user) {
        console.log("user not found in database!");
        return res.redirect('/login');
    }
    req.logIn(user, function(err) {
        if (err) {
            return next(err);
        }
        return res.redirect("/");
    });
  })(req, res, next);
});
// GET - authentication - logout: log a user out
app.get("/logout", function(request, response) {
    request.logout();
    response.redirect("/");
});

app.get("/", function(req, res) {
    res.send("root route"); 
});

// listen
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("================= I really love Jesus + theredstonetaco server started ============================");
});