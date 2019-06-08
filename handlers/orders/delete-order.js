'use strict'

const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const deleteOrder = async (orderId) => {
  if (!orderId) {
    throw new Error('Order ID is required for deleting the order');
  }

  try {
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