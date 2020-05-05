var mongoose = require("mongoose");
var Comment = require("./models/comment.js");
var Campground = require("./models/campground.js");


var data =[
	{
		author:
		{
			id: "5eabc34d8335c907cc86d17f",
			username:"bb"
		},
		price:0,
		name:"Night with house",
		image:"http://i.imgur.com/K3mPv14.jpg",
		description:"blah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blah"
	},
	{
		author:
		{
			id: "5eabc34d8335c907cc86d17f",
			username:"bb"
		},
		price:0,
		name:"Day with many houses",
		image:"http://i.imgur.com/SBEmFpv.jpg",
		description:"blah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blah"
	},
	{
		author:
		{
			id: "5eabc34d8335c907cc86d17f",
			username:"bb"
		},
		price:0,
		name:"Kids in the lake",
		image:"http://i.imgur.com/emvhOnb.jpg",
		description:"blah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blah"
	}	  
		  ];

function seedDB(){
	Campground.remove({},function(err){
		if (err) console.log(err);
		else {
			console.log("Removed all campgrounds !!!");
			data.forEach(function(campground){
				Campground.create(campground,function(err,newCampground){
					if (err) console.log(err);
					else{
						console.log("Added a new campground !!!");
						Comment.create(
							{
								author: {
									id:"588c2e092403d111454fff76",
									username:"default"
								},
								text: "This is my farvorite place!"
							}, function(err, comment){
								if (err) console.log(err);
								else{
									newCampground.comments.push(comment);
									newCampground.save();
									console.log("Added a new Comment !!!");
								}
							}
						);
					}
				});
			});
		}
	});
}

module.exports = seedDB;

