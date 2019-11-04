const express  = require("express"),
	  router   = express.Router(),
	  passport = require("passport"),
	  User	   = require("../models/user");

//Root route
router.get("/", function(req,res){
	res.render("landing")
});


//SHOW REGISTER FORM
router.get("/register", function (req, res){
	res.render("register")
});

//managing register logic
router.post("/register", function(req,res){
let newUser = new User({username: req.body.username});
User.register(newUser, req.body.password, function(err, user){
	if(err){
		req.flash("error", err.message)
		return res.render("register")
	} 
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp " + user.username)
			res.redirect("/index");
		})
	})
})

//SHOW REGISTER FORM
router.get("/login", function(req, res){
	res.render("login");
});

//handling login logic
router.post("/login",passport.authenticate("local",{
	successRedirect: "/index",
	failureRedirect: "/login" 
}), function(req, res){

});

//logout rout
router.get("/logout", function(req,res){
	req.logout();
	req.flash("success", "Logged you out!")
	res.redirect("/index")
})

module.exports = router;
