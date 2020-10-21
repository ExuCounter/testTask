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
    let usersInfo = [];
    try {
        const { offset } = req.query;
        const offsetNumber = 5;
        const url = `${API_URL}accounts?offset=${offsetNumber}&limit=${RESULTS_PER_PAGE}`;

        const { data } = await request(url);
        try {
            const usersRequests = data.map(user => getUserById(user.id));
            const users = await Promise.all(usersRequests);

            usersInfo = users.map((user, index) => {
                try {
                    const { data, included } = user;
                    const { id, name, from, email, links, createdAt: userCreatedAt } = data;
                    const { orders } = links || {};

                    if (!id) {
                        throw new Error('Invalid user ID');
                    }

                    let updatedOrders = [];
                    if (orders && orders.length > 0) {
                        updatedOrders = orders.map((order, index) => {
                            try {
                                let { id } = order;

                                if (!id) {
                                    throw new Error('Invalid order ID');
                                }

                                let { price, currency, status, updatedAt: orderUpdatedAt } = included.orders[index];
                                const timeToOrderAfterRegister = Math.floor((new Date(orderUpdatedAt) - new Date(userCreatedAt)) / 1000);

                                return { id, price, currency, status, timeToOrderAfterRegister }
                            } catch (error) {
                                return {
                                    id: 'Invalid detail information with order ID'
                                }
                            }
                        })
                    }

                    return {
                        id,
                        name: name || "NOT_DEFINED",
                        from: from || "NOT_DEFINED",
                        email: email || "NOT_DEFINED",
                        orders: updatedOrders
                    }
                } catch (error) {
                    return {
                        id: 'Invalid user ID'
                    }
                }
            })
        } catch (error) {
            console.error('Invalid users requests');
        }
    } catch (error) {
        console.error('Invalid request for list of the users')
        res.status(400).send([]);
    } finally {
        res.status(200).send(usersInfo);
    }
}

// Возможно это совершенно неверный подход с такой вложенностью и проверками,
// но буду очень рад если вы обьясните как это сделать правильно ( или любая подсказка ).

// Get user by id
const getUserById = async(id) => {
    try {
        const url = `${API_URL}accounts/${id}?include=contactedUsers,orders`;
        const data = await request(url, 'GET', null, { 'X-Leeloo-AuthToken': authToken });
        return data;
    } catch (error) {
        throw new Error('User with such id: ' + id + ' do not exist');
    }
}

module.exports = {
    getListOfUsers
}