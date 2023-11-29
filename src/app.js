const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require('./Routers');
const bodyParser = require("body-parser");
//---------
dotenv.config()

const app = express();
//---------
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
    

app.listen (process.env.PORT, ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})