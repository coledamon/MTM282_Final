const express = require("express");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const pug = require("pug");
const path = require("path");
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");
const { nextTick } = require("process");

const app = express();

app.listen(4000);

app.use(cookieParser(""));
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "/public")));


const urlEncodedParser = bodyParser.urlencoded({extended: false});

app.use(expressSession({
	secret: "any secret",
	saveUninitialized: true,
	resave: true
}));

app.use((req, res, next) => {
	if(!req.session.user && req.url != "/login" && req.url != "/signup") {
		res.redirect("/login");
	}
	else if(req.session.user && (req.url == "/login" || req.url == "/signup")) {
		res.redirect("/");
	}
	else {
		next();
	}
})

app.get("/", routes.index);
app.get("/login", routes.login);
app.post("/login", urlEncodedParser, routes.verifyUser);
app.get("/signup", routes.signUp);
app.post("/signup", urlEncodedParser, routes.createUser);
app.get("/profile", routes.profile);
app.get("/editProfile", routes.profileEdit);
app.post("/editProfile", urlEncodedParser, routes.editProfile);
app.get("/logout", routes.logout);


