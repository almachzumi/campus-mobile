/*
const aws = require('aws-sdk');
const s3 = new aws.S3(); // Pass in opts to S3 if necessary

var getParams = {
    Bucket: 's3-us-west-1', // your bucket name,
    Key: 'ucsd-mobile-dev/mock-apis/tutoring/tutors-v2.json' // path to the object you're looking for
}

s3.getObject(getParams, function(err, data) {
    // Handle any error and exit
    if (err)
        return err;

  // No error happened
  // Convert Body from a Buffer to a String

  let objectData = data.Body.toString('utf-8'); // Use the encoding necessary
	console.log(objectData);
});
*/
//const aws = require('aws-sdk');
var AWS = require("aws-sdk/dist/aws-sdk-react-native");
var s3 = new AWS.S3({apiVersion: '2006-03-01'});
var params = {Bucket: 'ucsd-mobile-dev/mock-apis/tutoring', Key: 'tutors-v2.json'};
var file = require('fs').createWriteStream(params);
s3.getObject(params).createReadStream().pipe(file);
