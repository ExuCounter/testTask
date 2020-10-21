var cache = require('memory-cache');
const cacheArray = [];

const updateCache = (req, res, next) => {
    try {
        const { query } = req;
        if (cacheArray.length == 10) {
            cacheArray.splice(0, 1);
        }
        cacheArray.push(query);
        cache.put('Last 10 queries', cacheArray);
        console.log('Queries in the cache: ' + cache.get('Last 10 queries'));
        next();
    } catch (error) {
        next(error.message);
    }
}

module.exports = {
    updateCache
}

// Я тут defacto ничего не изменил, скажу только что в описании пакета написано "in-memory" cache, но это ничего не меняет.
// Я не до конца понимаю разницу такого кеша и который вы хотите от меня с Redis, прошу небольшого фидбека, куда мне смотреть и что почитать.