const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const userRoute = require('./routes/userRoute');
const blogRoute = require('./routes/blogRoute');
const corsMiddleware = require('./middleware/corsMiddleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database Connection Established..")
    })
    .catch(error => console.log('Error: ',error));

app.use('/api',corsMiddleware,userRoute);
app.use('/blog',blogRoute);

app.get('/', (req,res) => {
    res.status(200).json({ message: "Welcome to Blog Landing Page"});
})

app.listen(`${process.env.BACKEND_PORT}`,() => {
    console.log(`Server Listening on PORT: ${process.env.BACKEND_PORT}`)
})