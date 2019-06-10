'use strict'

const AWS = require('aws-sdk');
const rp = require('request-promise');

const docClient = new AWS.DynamoDB.DocumentClient();

const deleteOrder = async (request) => {
  const orderId = request.pathParams.id;
  const user = request.context.authorizer.claims;

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

    if (order.username !== user['cognito:username']) {
      throw new Error('Order is not owned by your user');
    }

    if (order.Item.orderStatus !== 'pending') {
      throw new Error('Your order is getting ready or it\'s on the way bitch');
    }

    await rp({
      uri: `https://some-like-it-hot.effortless-serverless.com/delivery/${orderId}`,
      method: 'DELETE',
      headers: {
        "Authorization": "aunt-marias-pizzeria-1234567890"
      }
    });

    return await docClient.delete({
      TableName: 'pizza-orders',
      Key: {
        orderId
      }
    })
    .promise();
  } catch (error) {
    throw error;
  }
};

module.exports = {deleteOrder}