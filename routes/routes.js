const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const bcrypt = require('bcryptjs');
const { response } = require("express");

mongoose.connect("mongodb+srv://root:root@cluster0.wve5v.mongodb.net/data?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

let mdb = mongoose.connection;
mdb.on("error", console.error.bind(console, "connection error"));
mdb.once("open", (callback) => {

});

let userSchema = mongoose.Schema({
    username: String,
	password: String,
	salt: String,
    email: String,
    age: Number,
	answer1: String,
	answer2: String,
	answer3: String
});

let User = mongoose.model("users", userSchema);

exports.index = (req, res) => {
	let lastTime = req.cookies[`lastTimeHere${req.session.user.username}`] != undefined ? new Date(req.cookies[`lastTimeHere${req.session.user.username}`]).toLocaleTimeString() + " on " + new Date(req.cookies[`lastTimeHere${req.session.user.username}`]).toLocaleDateString() : null;
	res.cookie(`lastTimeHere${req.session.user.username}`, new Date(), 2147483647);
	res.render("home", {lastTime});
}
exports.login = (req, res) => {
	let error;
	if(req.session.error) {
		error = req.session.error;
		req.session.error = null;
	}
	res.render("signin", {error});
}
exports.verifyUser = (req, res) => {
	User.findOne({username: req.body.username}, (err, person) => {
		if (err) return console.error(err);
		if(person) {
			if(bcrypt.compareSync(req.body.password, person.password)) {
				req.session.user = person;
				res.redirect("/");
			} else {
				req.session.error = "Wrong username or password";
				res.redirect("/login");
			}
		} else {
			req.session.error = "Wrong username or password";
			res.redirect("/login");
		}
	});
	
}
exports.signUp = (req, res) => {
	let error;
	if(req.session.error) {
		error = req.session.error;
		req.session.error = null;
	}
	res.render("signup", {error});
}
exports.createUser = (req, res) => {
	if(req.body.password === req.body.passwordConf) {
		let salt = bcrypt.genSaltSync(10);
		let newUser = new User({
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password, salt),
			salt: salt,
			email: req.body.email,
			age: req.body.age,
			answer1: req.body.answer1,
			answer2: req.body.answer2,
			answer3: req.body.answer3
		});

		User.findOne({username: { '$regex': new RegExp(`^${newUser.username}$`, "i")}}, (err, currentUser) => {
			if(!currentUser) {
				newUser.save((err, person) => {
					if (err) return console.error(err);
					req.session.user = person;
					res.redirect("/");
				});
			} else {
				req.session.error = "A user with this username already exists"
				res.redirect("/signup");
			}
		})
	} else {
		req.session.error = "Passwords do not match"
		res.redirect("/signup");
	}
}
exports.profile = (req, res) => {
	res.render("profile", {user: req.session.user});
}
exports.profileEdit = (req, res) => {
	res.render("editProfile", {user: req.session.user});
}
let fields = ["username", "email", "age", "answer1", "answer2", "answer3"];
exports.editProfile = (req, res) => {
	console.log(req.session.user);
	User.findById(req.session.user._id, (err, user) => {
		console.log(user);
		if(err) return console.error(err);
		for(value of fields) {
			if(req.body[value] != "") {
				user[value] = req.body[value];
				if(value == "username") {
					res.cookie(`lastTimeHere${user.username}`, req.cookies[`lastTimeHere${req.session.user.username}`], 2147483647);
					res.clearCookie(`lastTimeHere${req.session.user.username}`);
				}
			}
		}
		req.session.user = user;
		user.save((err, user) => {
			if(err) return console.error(err);
			res.redirect("/profile");
		});
	});
	
}
exports.logout = (req, res) => {
	req.session.user = null;
	res.redirect("/login");
}

