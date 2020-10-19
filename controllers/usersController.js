const config = require('config');
const authToken = config.get('authToken');

// Common fetch request
const request = async(url, method = 'GET', body = null, headers = {}) => {
    try {
        const data = await fetch(url, { method, body, headers })
            .then(response => response.json())
        return data;
    } catch (error) {
        return `Query error:  ${error}`;
    }
}

// Users Handler Controller
const getListOfUsers = async(req, res) => {
    try {
        const data = await request('https://api.stage.leeloo.ai/api/v1/accounts?limit=50&offset=20', 'GET', null, { 'X-Leeloo-AuthToken': authToken });
        res.send(data);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getListOfUsers
}