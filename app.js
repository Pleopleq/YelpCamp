//Dependencies
const express 	 	= require("express"),
	app 		 	= express(),
	bodyParser	 	= require("body-parser"),
	mongoose 	 	= require("mongoose"),
	flash   		= require("connect-flash"),
	passport     	= require("passport"),
	LocalStrategy	= require("passport-local"),
	methodOverride	= require("method-override"),
	campgrounds  	= require("./models/campground"),
	comments	 	= require("./models/comment"),
	User			= require("./models/user"),
	seedDB 		 	= require("./seeds");
	

//requiring routes	
const commentRoutes     = require("./routes/comments"),
	  campgroundRoutes 	= require("./routes/campgrounds"),
	  indexRoutes		= require("./routes/index");

// //Mongo database
// seedDB(); seed the database
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
app.use(bodyParser.urlencoded("extended: true"))
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public")); 
app.use(methodOverride("_method"));
app.use(flash());

///////////////////////////
//PASSPORT CONFIGURATION///
///////////////////////////
app.use(require("express-session")({
	secret: "This is a test string",
	resave:false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success")
 	next();
})


//////////
//Routes//
//////////

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


app.listen(3000,function(){
	console.log("Connected..")   
});