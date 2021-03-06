'use strict'

const {getPizzas} = require('./pizzas/get-pizzas');

const {createOrder} = require('./orders/create-order');
const {updateOrder} = require('./orders/update-order');
const {deleteOrder} = require('./orders/delete-order');
const {getOrders} = require('./orders/get-orders');
const {updateDeliveryStatus} = require('./orders/update-delivery');

const {generatePresignedUrl} = require('./generate-presigned-url');

module.exports = {
  getPizzas,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  updateDeliveryStatus,
  generatePresignedUrl,
};