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
        const { offset } = req.query;
        const url = `https://api.stage.leeloo.ai/api/v1/accounts?offset=${offset ? offset : 0}&limit=10`;
        const { data } = await request(url);
        // Update array of users according to the task
        const usersArray = [];
        for (user of data) {
            const { id } = user;
            const { data, included } = await getUserById(id); // Receive object with user info
            const { name, from, email, links: { orders } } = data; // User info destructuring
            // Update orders array according to the task
            const ordersArray = [];
            if (orders.length > 0) {
                orders.map((order, index) => {
                    const { id } = order; // Order Id
                    const { price, currency, status } = included.orders[index];
                    ordersArray.push({ id, price, currency, status });
                })
            }
            usersArray.push({
                id,
                name,
                from,
                email,
                orders: ordersArray
            });
        }
        res.status(200).send(usersArray)
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get user by id
const getUserById = async(id) => {
    try {
        const url = `https://api.stage.leeloo.ai/api/v1/accounts/${id}?include=contactedUsers,orders`;
        const data = await request(url, 'GET', null, { 'X-Leeloo-AuthToken': authToken });
        return data;
    } catch (error) {
        return 'User do not exist'
    }
}

// Get order by id
const getOrderById = async(id) => {
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