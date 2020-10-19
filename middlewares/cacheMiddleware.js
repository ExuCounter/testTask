const fs = require('fs');

const updateCache = (req, res, next) => {
    try {
        const query = req.url;
        fs.readFile('./cache/cache.json', 'UTF-8', (err, data) => {
            if (err || !data) {
                const cache = {
                    queries: [

                    ]
                };
                cache.queries.push(query);
                fs.writeFile('./cache/cache.json', JSON.stringify(cache), 'utf-8', (error) => {
                    if (error) throw new Error(error)
                })
            } else {
                const cache = JSON.parse(data);
                if (cache.queries.length == 10) {
                    cache.queries.splice(0, 1);
                }
                cache.queries.push(query);
                fs.writeFile('./cache/cache.json', JSON.stringify(cache), 'utf-8', (error) => {
                    if (error) throw new Error(`Cache write error' + ${error.message}`);
                    console.log(data);
                })
            }
        })
        next();
    } catch (error) {
        throw new Error(`Cache updating error: ${error.message}`);
    }
}

module.exports = {
    updateCache
}