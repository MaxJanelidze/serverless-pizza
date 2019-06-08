'use strict'

const AWS = require('aws-sdk');
const uuid = require('uuid');

const docClient = new AWS.DynamoDB.DocumentClient();

const createOrder = async (order) => {
  if (!order || !order.pizza || !order.address) {
    throw new Error('To order pizza please provide pizza type and address where pizza should be delivered');
  }

  const Item = {
    orderId: uuid(),
    pizza: order.pizza,
    address: order.address,
    orderStatus: 'pending'
  };

  try {
    const order = await docClient.put({ TableName: 'pizza-orders', Item })
      .promise();

    return order;
  } catch (error) {
    throw error;
  }
};

module.exports = {createOrder}