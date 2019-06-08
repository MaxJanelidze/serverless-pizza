'use strict'

const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const updateOrder = async (orderId, options) => {
  if (!orderId || !options || !options.pizza || !options.address) {
    throw new Error('Order ID and options object are required for updating the order');
  }

  try {
    const updated = await docClient.update({
      TableName: 'pizza-orders',
      Key: {
        orderId
      },
      UpdateExpression: 'set pizzas = :p, address = :a',
      ExpressionAttributeValues: {
        ':p': options.pizza,
        ':a': options.address
      },
      ReturnValues: 'ALL_NEW'
    })
    .promise()

    return updated.Attributes;
  } catch (error) {
    throw error;
  }
};

module.exports = {updateOrder}