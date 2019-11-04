const campgrounds = require("../models/campground");
const comments = require("../models/comment");
const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
		//is user logged in?
	if(req.isAuthenticated()){
		campgrounds.findById(req.params.id, function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Campground not found...")
			res.redirect("back")
		} else {
			//if is its, does user own the campground?
			if(foundCampground.author.id.equals(req.user._id)){
				next();
			} else {
			//otherwhise, redirect
				req.flash("error", "You dont have permission to do that...")
				res.redirect("back")
			}
		}
	});
	} else {
		req.flash("error", "You need to be logged in to do that!")
		res.redirect("back");
	}
}


middlewareObj.checkCommentOwnership = function(req, res, next){
		//is user logged in?
	if(req.isAuthenticated()){
		comments.findById(req.params.comment_id, function(err, foundComment){
		if(err || !foundComment){
			req.flash("error", "Comment not found")
			res.redirect("back")
		} else {
			//if is its, does user own the comment ?
			if(foundComment.author.id.equals(req.user._id)){
				next();
			} else {
			//otherwhise, redirect
				req.flash("error", "You dont have permission to do that")
				res.redirect("back")
			}
		}
	});
	} else {
		req.flash("error", "You need to be logged in to do that")
		res.redirect("back");
	}
}


middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash("error", "You need to be logged in to do that!");
		res.redirect("/login");
	}
}
	


module.exports = middlewareObj;

