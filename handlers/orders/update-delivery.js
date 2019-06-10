'use strict'

const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

const docClient = new AWS.DynamoDB.DocumentClient();

const updateDeliveryStatus = async (data) => {
  console.log('Save an order', request)
  if (!data.status || !data.deliveryId) {
    throw new Error('Status and delivery ID are required');
  }

  try {
    await docClient.update({
      TableName: 'pizza-orders',
      Key: {
        orderId: data.deliveryId
      },
      AttributeUpdates: {
        orderStatus: {
          Action: 'PUT',
          Value: data.status
        }
      }
    })
    .promise();

    return {};
  } catch (error) {
    throw error;
  }
};

module.exports = {updateDeliveryStatus}