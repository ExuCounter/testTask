const config = require('config');
const authToken = config.get('authToken');

// Common fetch request
const request = async(url, method = 'GET', body = null, headers = { 'X-Leeloo-AuthToken': authToken }) => {
    try {
        const data = await fetch(url, { method, body, headers })
            .then(response => response.json())
        return data;
    } catch (error) {
        return `Query error:  ${error}`;
    }
}

// Get Users List
const getListOfUsers = async(req, res) => {
    try {
        const { offset, limit } = req.query;
        const url = `https://api.stage.leeloo.ai/api/v1/accounts?limit=${limit ? limit : 10}&offset=${offset ? offset : 0}`;
        const { data } = await request(url);
        // Update array of users according to task
        const usersArray = [];
        for (user of data) {
            const { id } = user;
            const { data } = await getUser(id); // Receive object with user info
            const { name, from, email } = data; // User info destructuring
            usersArray.push({
                id,
                name,
                from,
                email
            });
        }
        console.log(usersArray)
        res.status(200).send(usersArray)
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get User
const getUser = async(id) => {
    try {
        const url = `https://api.stage.leeloo.ai/api/v1/accounts/${id}?include=contactedUsers,orders`;
        const data = await request(url, 'GET', null, { 'X-Leeloo-AuthToken': authToken });
        return data;
    } catch (error) {
        return 'User do not exist'
    }
}

module.exports = {
    getListOfUsers
}