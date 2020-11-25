const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/data", {
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
    email: String,
    age: Number,
	answer1: String,
	answer2: String,
	answer3: String
});

let User = mongoose.model("users", userSchema);

exports.index = (req, res) => {
	if(!req.session.user) {
		res.redirect("/login");
	} else {
		//display cookie value
	}
}
exports.login = (req, res) => {
	res.render("login");
}
exports.verifyUser = (req, res) => {
	User.find({username: req.body.username}, (err, person) => {
		if(bcrypt.compareSync(person.password, bcrypt.hashSync(req.body.password, salt))) {
			req.session.user = person;
		} else {
			//wrong username or password
		}
	});
}
exports.signUp = (req, res) => {
res.render('signup')
}
exports.createUser = (req, res) => {
res.render()
}
exports.profile = (req, res) => {
res.render('profile', {
    user: User
});

}
exports.editProfile = (req, res) => {

}