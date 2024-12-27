const shortid= require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({message: 'URL is required'});
    const shortID= shortid();
    
    await URL.create({
        shortId: shortID, 
        redirectURL: req.body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.render("home",{
        id: shortID,
    });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({shortId});
    if(!entry) return res.status(404).json({message: 'URL not found'});
    return res.json({
        totalClicks: entry.visitHistory.length,
        analytics: entry.visitHistory,
    });
}

async function handleRedirectToOriginalURL(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId},
        {$push:{
            visitHistory: {timestamp: Date.now()}
        },
    });
    res.redirect(entry.redirectURL);
};

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleRedirectToOriginalURL,
};