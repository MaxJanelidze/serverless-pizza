'use strict'

const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const updateDeliveryStatus = async (data) => {
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
        deliveryStatus: {
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