const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.update({ region: 'us-east-2' }); // Update with the appropriate region


console.log('Writing GallaryImages table to DynamoDB...');
// Initialize DynamoDB client
var dynamodb = new AWS.DynamoDB.DocumentClient();
var galaryImages = JSON.parse(fs.readFileSync('../components/data/galary_links.json', 'utf8'));

galaryImages.forEach(function (image) {
  if (image.class.trim() === "") {
    image.class = "no_class";
  }
  var params = {
    TableName: 'GallaryImages',
    Item: {
      'src': image.link,
      'alt': image.alt,
      'className': image.class
    }
  };

  dynamodb.put(params, function (err, data) {
    if (err) {
      console.log("Unable to load data", image.link, JSON.stringify(err, null, 2));
    } else {
      console.log("Added", image.link, "to DynamoDB");
    }
  });
});


