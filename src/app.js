import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cityzenRouter from './Routers/cityzen.routes.js'

const app = express();
app.use(express.json());
dotenv.config();
//----------
mongoose
    .connect(process.env.MONGO_URL)
    .then(console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
//-----------------------------------
app.get('/', (req,res) => {
    res.send('hello world');
})
app.use('/api/cityzen', cityzenRouter);

//-----------------------------------
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});


// /api/cityzen/