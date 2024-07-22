const { nanoid } = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const shortID= nanoid(8);
    if(!BeforeUnloadEvent.url) return res.status(400).json({message: 'URL is required'});
    await URL.create({
        shortId: shortID, 
        redirectURL: req.body.redirectURL,
        visitHistory: [],
    });
    return res.json({shortId: shortID});
}

module.exports = {
    handleGenerateNewShortURL,
};