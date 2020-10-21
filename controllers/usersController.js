const config = require('config');
const authToken = config.get('authToken');
const { SETTINGS } = require('../config/constants');
const { API_URL, RESULTS_PER_PAGE } = SETTINGS;


// Common fetch query
const request = async(url, method = 'GET', body = null, headers = { 'X-Leeloo-AuthToken': authToken }) => {
    try {
        const data = await fetch(url, { method, body, headers });

        return data.json();
    } catch (error) {
        return new Error(`Query error:  ${error}`);
    }
}

// Get list of users
const getListOfUsers = async(req, res, next) => {
    try {
        const { offset } = req.query;
        const offsetNumber = offset || 0;
        const url = `${API_URL}accounts?offset=${offsetNumber}&limit=${RESULTS_PER_PAGE}`;
        const { data } = await request(url);

        const usersArray = [];
        for (const user of data) {
            const { id } = user;
            const { data, included } = await getUserById(id);
            const { name, from, email, links, createdAt: userCreatedAt } = data;
            const { orders } = links;

            let updatedOrders;
            if (orders.length > 0) {
                updatedOrders = orders.map((order, index) => {
                    const { id } = order;
                    const { price, currency, status, updatedAt: orderUpdatedAt } = included.orders[index];
                    const timeToOrderAfterRegister = Math.floor((new Date(orderUpdatedAt) - new Date(userCreatedAt)) / 1000);

                    return { id, price, currency, status, timeToOrderAfterRegister }
                })
            }

            usersArray.push({
                id,
                name,
                from,
                email,
                orders: updatedOrders
            });
        }
        res.status(200).send(usersArray);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Get user by id
const getUserById = async(id) => {
    try {
        const url = `${API_URL}accounts/${id}?include=contactedUsers,orders`;
        const data = await request(url, 'GET', null, { 'X-Leeloo-AuthToken': authToken });
        return data;
    } catch (error) {
        throw new Error('User do not exist');
    }
}

module.exports = {
    getListOfUsers
}