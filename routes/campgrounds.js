var express = require("express");
var router = express.Router();
var middlewareObject=require("../middleware");

router.get("/",function(req,res){
	// res.render("campgrounds",{campgrounds:campgrounds});
	Campground.find(function(err,campgrounds){
		if(err) console.log(err);
		else res.render("campgrounds/index",{campgrounds:campgrounds})
	});
	
});

router.post("/",middlewareObject.isLoggedIn,function(req,res){
	var name = req.body.name;
	var image= req.body.image;
	var description = req.body.description;
	var newCampground = {
							name: name,
							image:image,
							description: description,
							author:{
								id: req.user._id,
								username:req.user.username
							},
							price:req.body.price
						}
	
	Campground.create(newCampground,function(err,campground){
		
		if(err) console.log(err);
	});

	res.redirect("/campgrounds");
});

router.get("/new",middlewareObject.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});

router.get("/:id",function(req,res){
	var imageID=req.params.id; 
	Campground.findById(imageID).populate("comments").exec(function(err,campground){
		if(err) console.log(err);
		else {
			res.render("campgrounds/show",{campground:campground});
		}
	})
});

router.get("/:id/edit",middlewareObject.campgroundUserVerified,function(req,res){
	var imageID=req.params.id; 
	Campground.findById(imageID).populate("comments").exec(function(err,campground){
		if(err) console.log(err);
		else {
		
			res.render("campgrounds/edit",{campground:campground});
		}
	})
})

router.put("/:id",middlewareObject.campgroundUserVerified,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,campground){
		if(err) console.log(err);
		else {	
			res.redirect("/campgrounds/"+req.params.id);			
		}
	})
})

router.delete("/:id",middlewareObject.campgroundUserVerified,function(req,res){
	Campground.findByIdAndDelete(req.params.id,function(err,campground){
		if(err) console.log(err);
		else {	
			res.redirect("/campgrounds");			
		}
	})
})


module.exports = router;