const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.update({ region: 'us-east-2' }); // Update with the appropriate region


console.log('Writing Menu Links table to DynamoDB...');
// Initialize DynamoDB client
var dynamodb = new AWS.DynamoDB.DocumentClient();
var menuLinks = JSON.parse(fs.readFileSync('../components/data/menu_links.json', 'utf8'));

menuLinks.forEach(function (link) {
  var params = {
    TableName: 'MenuLinks',
    Item: {
      'class': link.class,
      'href': link.href,
      'text': link.text
    }
  };

  dynamodb.put(params, function (err, data) {
    if (err) {
      console.log("Unable to load data", link.text, JSON.stringify(err, null, 2));
    } else {
      console.log("Added", link.text, "to DynamoDB");
    }
  });
});


