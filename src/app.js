const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require('./Routers');
const bodyParser = require("body-parser");

dotenv.config()

const app = express();
const port = process.env.PORT||3500;

app.get('/', (req,res)=>{
    return res.send('Hello World');
})

app.use(bodyParser.json())

routes(app);


mongoose.connect(`${process.env.MONGO_URL}`)
    .then(() => {
        console.log('Connect DB success');
    })
    .catch((err)=>{
        console.log(err);
    })
    

app.listen (port, ()=>{
    console.log(`Server is running in local host${port}`);
})