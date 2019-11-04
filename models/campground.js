mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	author: {
		id:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
		},
	username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "comment"
		}
	]
});

//Adding the properties of model() to campgrounds
module.exports = mongoose.model("campgrounds", campgroundSchema);
