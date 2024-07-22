const express = require('express');
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');
const urlRoute = require('./routes/url');

const app = express();
const port = 8000;

connectToMongoDB('mongodb://localhost:27017/url-shortener').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Failed to connect to MongoDB', err);
});

app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortId', async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId},
        {$push:{
            visitHistory: {timestamp: Date.now()}
        },
    });
    res.redirect(entry.redirectURL);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});