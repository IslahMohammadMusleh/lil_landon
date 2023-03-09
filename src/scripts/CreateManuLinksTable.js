const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-2'}); // Update with the appropriate region

// Initialize DynamoDB client
const dynamodb = new AWS.DynamoDB();

// Create table
const params = {
  TableName: 'MenuLinks',
  KeySchema: [
    { AttributeName: 'class', KeyType: 'HASH' },  // Partition key
    { AttributeName: 'href', KeyType: 'RANGE' }   // Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: 'class', AttributeType: 'S' },
    { AttributeName: 'href', AttributeType: 'S' },
    { AttributeName: 'text', AttributeType: 'S' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  LocalSecondaryIndexes: [
    {
      IndexName: 'TextIndex',
      KeySchema: [
        { AttributeName: 'class', KeyType: 'HASH' },  // Partition key
        { AttributeName: 'text', KeyType: 'RANGE' }   // Sort key
      ],
      Projection: {
        ProjectionType: 'ALL'
      }
    },
    {
      IndexName: 'ClassIndex',
      KeySchema: [
        { AttributeName: 'class', KeyType: 'HASH' },  // Partition key
        { AttributeName: 'href', KeyType: 'RANGE' }   // Sort key
      ],
      Projection: {
        ProjectionType: 'ALL'
      }
    }
  ]
};

dynamodb.createTable(params, function(err, data) {
  if (err) {
    console.log("Error creating table:", err);
  } else {
    console.log("Table created successfully:", data);
  }
});
