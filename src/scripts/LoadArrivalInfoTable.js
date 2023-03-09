const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.update({ region: 'us-east-2' }); // Update with the appropriate region


console.log('Writing ArrivalInfo table to DynamoDB...');
// Initialize DynamoDB client
var dynamodb = new AWS.DynamoDB.DocumentClient();
var arrivalInfoData = JSON.parse(fs.readFileSync('../components/data/hotel_arrival_info.json', 'utf8'));

arrivalInfoData.forEach(function (info) {
  var params = {
    TableName: 'ArrivalInfo',
    Item: {
      'name': info.name,
      'description': info.description
    }
  };

  dynamodb.put(params, function (err, data) {
    if (err) {
      console.log("Unable to load data", info.name, JSON.stringify(err, null, 2));
    } else {
      console.log("Added", info.name, "to DynamoDB");
    }
  });
});


