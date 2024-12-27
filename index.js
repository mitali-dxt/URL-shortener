const express = require('express');
const { connectToMongoDB } = require('./connect');
const path = require('path');
const cookieParser = require('cookie-parser');
const { restrictToLoggedInUserOnly, checkAuth} = require('./middleware/auth');

const urlRoute = require('./routes/url');
const staticRoute =require('./routes/staticRoute');
const userRoute = require('./routes/user');

const app = express();
const port = 8000;

connectToMongoDB('mongodb://127.0.0.1:27017/url-shortener').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Failed to connect to MongoDB', err);
});

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/',checkAuth, staticRoute);
app.use('/url', restrictToLoggedInUserOnly,urlRoute);
app.use('/user',userRoute);
app.use('/', staticRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});