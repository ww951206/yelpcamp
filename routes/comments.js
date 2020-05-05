var express = require("express");
var router = express.Router({mergeParams:true});
// var Campground = require("../models/campground");
var middlewareObject=require("../middleware");

// NEW comments
router.get("/new",middlewareObject.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err) console.log(err)
		else{
			res.render("comments/new",{campground:campground});
		}
	})	
	
})

// CREATE COMMENTS
router.post("/",middlewareObject.isLoggedIn,function(req,res){
	Comment.create(req.body.comment,function(err,comment){
		if(err)  console.log(err);
		else{
			Campground.findById(req.params.id,function(err,campground){
				if(err)  console.log(err);
				else{
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/"+req.params.id)
				}
			})
		}
	})
});

router.get("/:cid/edit",middlewareObject.commentUserVerified,function(req,res){
	
	Comment.findById(req.params.cid,function(err,comment){
		res.render("comments/edit",{comment:comment, campground_id:req.params.id});
	})

	
});

router.put("/:cid",middlewareObject.commentUserVerified,function(req,res){
	Comment.findByIdAndUpdate(req.params.cid,req.body.comment,function(err,comment){
			if(err) console.log(err);
			else{
				res.redirect("/campgrounds/"+req.params.id);	
			}
	})
});

router.delete("/:cid",middlewareObject.commentUserVerified,function(req,res){
	Comment.findByIdAndDelete(req.params.cid,function(err,comment){
			if(err) console.log(err);
			else{
				res.redirect("/campgrounds/"+req.params.id);	
			}
	})
})


module.exports  = router;