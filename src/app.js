const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./Routers");
const bodyParser = require("body-parser");
const path = require("path");
//---------
dotenv.config();

const app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));
//---------
app.get("/", (req, res) => {
    res.render("index");
});

app.use(bodyParser.json());
routes(app);

mongoose
    .connect(`${process.env.MONGO_URL}`)
    .then(() => {
        console.log("Connect DB success");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
