var express         = require("express"),
     app            = express(),
     bodyParser     = require("body-parser"),
     mongoose       = require("mongoose"),   // Connect mongoose 
     flash          = require("connect-flash");
     passport       = require("passport"),
     LocalStrategy  = require("passport-local"),
     methodOverride = require("method-override"),
     Campground     = require("./models/campground"),
     Comment        = require("./models/comment"),
     User           = require("./models/user")


    //  seedDB         = require("./seeds")


    

//req routes

var commentRoutes         = require("./routes/comments"),
    campgroundRoutes      = require("./routes/campgrounds"),
    indexRoutes           = require("./routes/index")   

    

mongoose.connect("mongodb://localhost:27017/Yelp_camp_v10", { useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB(); //seed the database


// PASSPORT CONFIG

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
    
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.locals.moment = require('moment'); // czas od utworzenia 

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});





app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log("The YelpCamp Server Has Started!");

});




