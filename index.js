const express = require('express');
const { connectToMongoDB } = require('./connect');
const path = require('path');
const urlRoute = require('./routes/url');
const staticRoute =require('./routes/staticRoute');

const app = express();
const port = 8000;

connectToMongoDB('mongodb://localhost:27017/url-shortener').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Failed to connect to MongoDB', err);
});

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/url', urlRoute);
app.use('/', staticRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});