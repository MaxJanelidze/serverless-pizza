'use strict'

const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const getOrders = async (orderId) => {
  try {
    if (typeof orderId === 'undefined') {
      const orders = await docClient.scan({TableName: 'pizza-orders'})
        .promise();

      return orders;
    } else {
      const doc = await docClient.get({
        TableName: 'pizza-orders',
        Key: {
          orderId
        }
      })
      .promise();

      if (!doc.Items) {
        throw new Error('Order not found');
      }

      return doc.Items;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {getOrders}