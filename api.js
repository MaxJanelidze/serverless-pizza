'use strict'

const Api = require('claudia-api-builder');

const api = new Api();

const {
  getPizzas,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  updateDeliveryStatus
} = require('./handlers');

api.registerAuthorizer('auth', {
  providerARNs: [process.env.userPoolArn]
});

// List of pizzas
api.get('/pizzas', () => getPizzas());

// Get pizzas by ID
api.get('/pizzas/{id}', (request) => {
  return getPizzas(request.pathParams.id);
}, {
  error: 404
});

// Get orders
api.get('/orders', async () => await getOrders(), {
  cognitoAuthorizer: 'auth'
});

// Get order by ID
api.get('/orders/{id}', async (request) => {
  return await getOrders(request.pathParams.id);
}, {
  error: 404,
  cognitoAuthorizer: 'auth'
});

// Create an order
api.post('/orders', async (request) => {
  return await createOrder(request.body);
}, {
  success: 201,
  error: 400,
  cognitoAuthorizer: 'auth'
});

// Update an order
api.put('/orders/{id}', async (request) => {
  return await updateOrder(request.pathParams.id, request.body);
}, {
  error: 400,
  cognitoAuthorizer: 'auth'
});

// Delete an order
api.delete('/orders/{id}', async (request) => {
  return await deleteOrder(request.pathParams.id);
}, {
  error: 400,
  cognitoAuthorizer: 'auth'
});

// Update delivery status
api.post('/delivery', async (request) => {
  return await updateDeliveryStatus(request.body)
}, {
  success: 200,
  error: 400,
  cognitoAuthorizer: 'auth'
});

module.exports = api;