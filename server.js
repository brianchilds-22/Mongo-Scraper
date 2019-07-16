var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var PORT = process.env.PORT || 3000;
var app = express();
var router = express.Router();
require("../config/routes.js")(router);
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");
app.use(router);
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(db, function(error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("mongoose is connected");
    }
});
app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
});