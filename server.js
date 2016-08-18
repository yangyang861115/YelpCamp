var express               = require("express"),
    bodyParser            = require("body-parser"),
    methodOverride        = require("method-override"),
    sanitizer             = require("express-sanitizer"),
    passport              = require("passport"),
    localStrategy         = require("passport-local"),
    expressSession        = require("express-session"),
    flash                 = require("connect-flash"),
    mongoose              = require("mongoose"),
    seedDB                = require("./seeds"),
    app                   = express(),
    Campground            = require("./models/campground"),
    Comment               = require("./models/comment"),
    User                  = require("./models/user");

//require routes
var commentRoutes    = require("./routes/comment"),
    campgroundRoutes = require("./routes/campground"),
    indexRoutes       = require("./routes/index");

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(sanitizer());
app.use(flash());

//PASSPORT CONFIGURATION
app.use(expressSession({
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(express.static(__dirname + "/public"));
mongoose.connect(process.env.DATABASEURL || "mongodb://localhost/yelpcamp");

//seedDB();

//use routes
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
})