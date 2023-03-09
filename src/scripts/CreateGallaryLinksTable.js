const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-2'}); // Update with the appropriate region

// Initialize DynamoDB client
const dynamodb = new AWS.DynamoDB();

// Create table
const params = {
  TableName: 'GallaryImages',
  KeySchema: [
    { AttributeName: 'src', KeyType: 'HASH' },  // Partition key
    { AttributeName: 'className', KeyType: 'RANGE' }   // Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: 'alt', AttributeType: 'S' },
    { AttributeName: 'src', AttributeType: 'S' },
    { AttributeName: 'className', AttributeType: 'S' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  LocalSecondaryIndexes: [
    {
      IndexName: 'AltIndex',
      KeySchema: [
        { AttributeName: 'src', KeyType: 'HASH' },  // Partition key
        { AttributeName: 'alt', KeyType: 'RANGE' }   // Sort key
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
