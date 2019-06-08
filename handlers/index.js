'use strict'

const {getPizzas} = require('./pizzas/get-pizzas');
const {createOrder} = require('./orders/create-order');
const {updateOrder} = require('./orders/update-order');
const {deleteOrder} = require('./orders/delete-order');
const {getOrders} = require('./orders/get-orders');

module.exports = {
  getPizzas,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders
};