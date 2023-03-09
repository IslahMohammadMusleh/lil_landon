const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-2'}); // Update with the appropriate region

// Initialize DynamoDB client
const dynamodb = new AWS.DynamoDB();

// Create table
const params = {
  TableName: 'Services',
  KeySchema: [
    { AttributeName: 'name', KeyType: 'HASH' },  // Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: 'name', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err) {
    console.log("Error creating table:", err);
  } else {
    console.log("Table created successfully:", data);
  }
});
