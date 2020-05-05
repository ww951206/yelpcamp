var express 	= require("express");
 	app 		= express();
	bodyParser 	= require("body-parser");    
	methodOverride = require("method-override")
 	mongoose 	= require("mongoose");
	Comment 	= require("./models/comment.js");
	Campground 	= require("./models/campground.js");
	passport 	= require("passport");
	flash		= require("connect-flash");
	LocalStrategy = require("passport-local");
	User 		= require("./models/user.js")
	seedDB 		=  require("./seed.js");
	mongoose.connect("mongodb+srv://Micky:ww971ww871@cluster0-eb1ap.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true});


// Route require
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");

app.use(express.static("views/partial"));
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());
app.use(methodOverride("_method"));
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"bubu is the best and cutest dog in the world!",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // User.authentica comes from PASSPORT-LOCAL-MONGOOSE
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware for all routes
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});
