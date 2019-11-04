const express 	  = require("express"),
	  router  	  = express.Router(),
	  campgrounds = require("../models/campground"),
	  comments 	  = require("../models/campground"),
	  middleware  = require("../middleware/indexM.js");

//INDEX ROUTE - SHOW ALL CAMPGROUNDS
router.get("/index", function(req,res){
	campgrounds.find({}, function(err,allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});


//CREATE NEW CAMPGROUND TO DATABASE
router.post("/campgrounds", middleware.isLoggedIn ,function(req,res){
	let name           = req.body.name;
	let image          = req.body.image;
	let descrip   	   = req.body.description;
	let author		   = {
		id: req.user._id,
		username: req.user.username
	}
	let newCampground  = {name: name , image: image, description: descrip, author: author};
	campgrounds.create(newCampground, function(err, newCreate){
		if(err){
			console.log(err);
		} else {
			res.redirect("/index");
		}
	});
});

//NEW - SHOW FORM TO CREATE CAMPGROUND
router.get("/campgrounds/new", middleware.isLoggedIn , function(req,res){
	res.render("campgrounds/new")
});

//SHOW - Show information about one campground in particular
router.get("/campgrounds/:id", function(req,res){
	campgrounds.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Campground not found!")
			res.redirect("back")
		} else {
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});	
});

// EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
		campgrounds.findById(req.params.id, function(err, foundCampground){
			res.render("campgrounds/edit", {campground: foundCampground})
		});
});
// UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req,res){
	campgrounds.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/index")
		} else {
			res.redirect("/campgrounds/"+req.params.id)
		}
	})
})

// DELETE CAMPGROUND ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership,function(req,res){
	campgrounds.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/index");
		} else {
			res.redirect("/index");
		}
	})
})



module.exports = router;