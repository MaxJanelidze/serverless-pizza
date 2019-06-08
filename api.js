'use strict'

const Api = require('claudia-api-builder');

const api = new Api();

const {
  getPizzas,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders
} = require('./handlers');

// List of pizzas
api.get('/pizzas', () => getPizzas());

// Get pizzas by ID
api.get('/pizzas/{id}', (request) => {
  return getPizzas(request.pathParams.id);
}, {
  error: 404
});

// Get orders
api.get('/orders', async () => await getOrders());

// Get order by ID
api.get('/orders/{id}', async (request) => {
  return await getOrders(request.pathParams.id);
}, {
  error: 404
});

// Create an order
api.post('/orders', async (request) => {
  return await createOrder(request.body);
}, {
  success: 201,
  error: 400
});

// Update an order
api.put('/orders/{id}', (request) => {
  return updateOrder(request.pathParams.id, request.body);
}, {
  error: 400
});

// Delete an order
api.delete('/orders/{id}', (request) => {
  return deleteOrder(request.pathParams.id);
}, {
  error: 400
});

module.exports = api;