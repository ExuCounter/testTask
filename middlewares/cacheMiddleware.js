const fs = require('fs');
const NodeCache = require('node-cache');
const cache = new NodeCache();

const cacheArray = [];

const updateCache = (req, res, next) => {
    try {
        const query = req.url;
        if (cacheArray.length == 10) {
            cacheArray.splice(0, 1);
        }
        cacheArray.push(query);
        cache.set('Last 10 queries', cacheArray);
        console.log('Queries in the cache: ' + cache.get('Last 10 queries'));
        next();
    } catch (error) {
        next(error.message);
    }
}

module.exports = {
    updateCache
}