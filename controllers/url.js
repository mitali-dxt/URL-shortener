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
    });
    return res.json({shortId: shortID});
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

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};