var express = require("express");
var router = express.Router();


router.get("/",function(req,res){
	res.render("landing");
});

//===============================================================
// AUTHENTICATE ROUTES
//===============================================================

// Show register form

router.get("/register",function(req,res){
	res.render("register");
})

//handle sign up logic

router.post("/register",function(req,res){
	// Store new User with username and hashed passwrod
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err) {
			req.flash("error",err.message);
			res.render("register");
		} 
		passport.authenticate("local")(req,res,function(){
			req.flash("success","You have loged in as "+req.user.username);
			res.redirect("/campgrounds");
		})
	}) // provided by packet: passport-local-mongoose
})

// show log in form

router.get("/login",function(req,res){
	res.render("login");
});

//handle login logic
// app.post("/login",middleware,callback)
// Difference use for "passport.authenticate" between here and register: Before it's called after register is done. Here it's middleware function, after it finish, other function can be call.
router.post("/login",passport.authenticate("local",
	{
		successRedirect:"/campgrounds",
		failureRedirect:"/login"
	}),function(req,res){
});

// logout route

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","You have loged out")
	res.redirect("/campgrounds");
});


module.exports = router;