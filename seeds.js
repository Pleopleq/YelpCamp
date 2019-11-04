const mongoose = require("mongoose"),
	  campgrounds = require("./models/campground"),
	  comment   = require("./models/comment");

const seeds =[
	{name: "Secret Forest",
	image: "https://www.photosforclass.com/download/pixabay-815297?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F5ee1d0414355b108f5d084609620367d1c3ed9e04e50744e742c7dd5904cc1_960.jpg&user=bertvthul",
	 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	},
		{name: "Lonely Lake",
	image: "https://www.photosforclass.com/download/pixabay-1581879?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e5dd424255a514f6da8c7dda793f7f1636dfe2564c704c722e78d2964ac05e_960.jpg&user=12019",
	 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	},
		{name: "Cool Mountain",
	image: "https://www.photosforclass.com/download/pixabay-3048299?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F55e0d14b485ba514f6da8c7dda793f7f1636dfe2564c704c722e78d2964ac05e_960.jpg&user=kareni",
	 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	}
]
	

function seedDB(){
	//Remove all campgrounds
	campgrounds.remove({}, function(err){
	if(err){
		console.log(err);
	}
		console.log ("removed campgrounds");
		seeds.forEach(function(seed){
			campgrounds.create(seed, function(err, campgrounds){
				if(err){
					console.log(err)
				} else {
					console.log("added a campground");
					comment.create(
					{
						text:"Great place. I love it!",
						author:"Pepe"
					}, function(err,comment){
						if(err){
							console.log(err);
						} else {
						campgrounds.comments.push(comment);
						campgrounds.save();
						console.log("Created new comment");
						}

					});
				}
			});	
		});
	});
}


module.exports = seedDB;

