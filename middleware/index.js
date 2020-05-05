var middlewareObject={};

middlewareObject.commentUserVerified= function (req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.cid,function(err,comment){
			if(comment.author.id.equals(req.user.id)){
				return next();
			} else {
				req.flash("error","You Do Not Have Permission To Do That")
				res.redirect("back");
			}
		});
	} else {
		
		req.flash("error","You must log in before editing")
		res.redirect("/login");
	}
}

middlewareObject.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}	
	req.flash("error","You must log in before editing")
	res.redirect("/login");
}

middlewareObject.campgroundUserVerified=function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,campground){
			if(err)console.log(err);
			else{
				if(campground.author.id.equals(req.user.id)){
					return next();
				} else{
					req.flash("error","You Do Not Have Permission To Do That")
					res.redirect("/campgrounds");
				}
			}
		})
	} else{
		req.flash("error","You must sign in before editing")
		res.redirect("/login");
	}
}

module.exports=middlewareObject;