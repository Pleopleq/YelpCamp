const express 	  = require("express"),
	  router  	  = express.Router(),
	  campgrounds = require("../models/campground"),
	  comments	  = require("../models/comment"),
	  middleware  = require("../middleware/indexM.js");

//comments new
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req,res){
	campgrounds.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err)
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

//comments create 
router.post("/campgrounds/:id/comments", middleware.isLoggedIn , function(req,res){
	//lookup campgrounds id
	campgrounds.findById(req.params.id,function(err, campground){
		if(err){
			console.log(err)
			res.redirect("/campgrounds");
		} else {
			comments.create(req.body.comment, function(err,comment){
				if(err){
					req.flash("error", "Something went wrong...")
					console.log(err)
				} else {
					//add username and id to comment and then save it
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Successfully added comment")
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});


//COMMENT EDIT ROUTE
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function (req,res){
		campgrounds.findById(req.params.id, function (err, foundCampground){
				if(err || !foundCampground){
					req.flash("error", "Cannot find that campground")
				return res.redirect("back")
			}
		comments.findById(req.params.comment_id , function(err, foundComment){
			if (err){
				res.redirect("back")
			} else {
				res.render("comments/edit", {campground_id: req.params.id, comments: foundComment});
			}
		});
	});
});

//COMMENT UPDATE ROUTE
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership,  function(req,res){
	comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
		if(err){
			res.redirect("back")
		} else {
			res.redirect("/campgrounds/"+ req.params.id)
		}
	})
})

// DELETE COMMENT ROUTE
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership,  function (req,res){
	comments.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back")
		} else{
			req.flash("success", "Comment deleted")
			res.redirect("/campgrounds/"+ req.params.id)
		}
	})
})




module.exports = router;
