'use strict'

const uuidv4 = require('uuid/v4');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const generatePresignedUrl = async () => {
  const params = {
    Bucket: process.env.bucketName,
    Key: uuidv4(),
    ACL: 'public-read',
    Expires: 120
  };

  const url = await s3.getSignedUrl('putObject', params).promise();

  return url;
};

module.exports = {generatePresignedUrl}