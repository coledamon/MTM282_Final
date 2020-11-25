const express = require("express");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const pug = require("pug");
const path = require("path");
const routes = require("./routes/routes");

const app = express();

app.listen(4000);

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "/public")));


const urlEncodedParser = bodyParser.urlencoded({extended: false});

app.use(expressSession({
	secret: "any secret",
	saveUninitialized: true,
	resave: true
}));

app.get("/", routes.index);
app.get("/login", routes.login);
app.post("/login", urlEncodedParser, routes.verifyUser);
app.get("/signUp", routes.signUp);
app.post("/signUp", urlEncodedParser, routes.createUser);
app.get("/profile", routes.profile);
app.post("/profile", urlEncodedParser, routes.editProfile);

