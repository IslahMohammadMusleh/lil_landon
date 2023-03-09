const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.update({ region: 'us-east-2' }); // Update with the appropriate region


console.log('Writing Accessabilities table to DynamoDB...');
// Initialize DynamoDB client
var dynamodb = new AWS.DynamoDB.DocumentClient();
var accessabilitiesData = JSON.parse(fs.readFileSync('../components/data/hotel_accessibility.json', 'utf8'));

accessabilitiesData.forEach(function (accessability) {
  var params = {
    TableName: 'Accessabilities',
    Item: {
      'name': accessability.name,
    }
  };

  dynamodb.put(params, function (err, data) {
    if (err) {
      console.log("Unable to load data", accessability.name, JSON.stringify(err, null, 2));
    } else {
      console.log("Added", accessability.name, "to DynamoDB");
    }
  });
});


