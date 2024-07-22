const express = require('express');
const urlRoute = require('./routes/url');

const app = express();
const port = 8000;

app.use('/url', urlRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});