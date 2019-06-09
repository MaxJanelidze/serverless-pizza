'use strict'

const AWS = require('aws-sdk');
const rp = require('request-promise');

const docClient = new AWS.DynamoDB.DocumentClient();

const deleteOrder = async (orderId) => {
  if (!orderId) {
    throw new Error('Order ID is required for deleting the order');
  }

  try {
    const order = await docClient.get({
      TableName: 'pizza-orders',
      Key: {
        orderId
      }
    })
    .promise();

    if (order.Item.orderStatus !== 'pending') {
      throw new Error('Your order is getting ready or in it\'s way bitch');
    }

    await rp({
      uri: `https://some-like-it-hot.effortless-serverless.com/delivery/${orderId}`,
      method: 'DELETE',
      headers: {
        "Authorization": "aunt-marias-pizzeria-1234567890"
      }
    });

    const deleted = await docClient.delete({
      TableName: 'pizza-orders',
      Key: {
        orderId
      }
    })
    .promise();

    return deleted;
  } catch (error) {
    throw error;
  }
};

module.exports = {deleteOrder}