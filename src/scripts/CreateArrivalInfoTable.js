const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-2'}); // Update with the appropriate region

// Initialize DynamoDB client
const dynamodb = new AWS.DynamoDB();

// Create table
const params = {
  TableName: 'ArrivalInfo',
  KeySchema: [
    { AttributeName: 'name', KeyType: 'HASH' },  // Partition key
    { AttributeName: 'description', KeyType: 'RANGE' }   // Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: 'name', AttributeType: 'S' },
    { AttributeName: 'description', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  LocalSecondaryIndexes: [
    {
      IndexName: 'TextIndex',
      KeySchema: [
        { AttributeName: 'name', KeyType: 'HASH' },  // Partition key
        { AttributeName: 'description', KeyType: 'RANGE' }   // Sort key
      ],
      Projection: {
        ProjectionType: 'ALL'
      }
    },
    {
      IndexName: 'ClassIndex',
      KeySchema: [
        { AttributeName: 'name', KeyType: 'HASH' },  // Partition key
        { AttributeName: 'description', KeyType: 'RANGE' }   // Sort key
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
