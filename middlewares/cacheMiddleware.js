const fs = require('fs').promises;

const updateCache = async(req, res, next) => {
    fs.writeFile('./cache/cache.json', JSON.stringify({}), 'utf-8', (error) => {
        console.log('111')
        if (error) throw new Error(`Cache write error' + ${error.message}`);
    })
}

module.exports = {
    updateCache
}