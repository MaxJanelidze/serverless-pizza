'use strict'

const AWS = require('aws-sdk');
const rp = require('request-promise');

const docClient = new AWS.DynamoDB.DocumentClient();

const createOrder = async (request) => {
  const order = request.body;
  const user = request.context.authorizer.claims;
  
  console.log('User data', user)

  let userAddress = order && order.address;
  if (!userAddress) {
    userAddress = JSON.parse(user.address).formatted;
  }

  if (!order || !order.pizza || userAddress) {
    throw new Error('To order pizza please provide pizza type and address where pizza should be delivered');
  }

  try {
    const response = await rp({
      uri: 'https://some-like-it-hot.effortless-serverless.com/delivery',
      method: 'POST',
      headers: {
        "Authorization": "aunt-marias-pizzeria-1234567890",
        "Content-type": "application/json"
      },
      body: {
        pickupTime: '15.34pm',
        pickupAddress: 'Aunt Maria Pizzeria',
        deliveryAddress: userAddress,
        webhookUrl: 'https://tbika6r4w6.execute-api.eu-central-1.amazonaws.com/latest/delivery'
      },
      json: true
    });

    const Item = {
      orderId: response.deliveryId,
      pizza: order.pizza,
      address: userAddress,
      orderStatus: 'pending'
    };

    const newOrder = await docClient.put({
      TableName: 'pizza-orders',
      Item
    })
      .promise();

    return newOrder.Attributes;
  } catch (error) {
    throw error;
  }
};

module.exports = { createOrder }