import { Meteor } from 'meteor/meteor'

const s3Conf = Meteor.settings.s3 || {};

if (!(s3Conf && s3Conf.key && s3Conf.secret && s3Conf.bucket && s3Conf.region)) {
    console.error('s3-details.js | Unable to fetch AWS S3 details from settings.json');
    console.error('s3-details.js | Make sure settings.json exists and use "meteor --settings settings.json" to run Meteor')
    throw new Meteor.Error('missing-s3-settings', 's3-details.js | Unable to fetch AWS S3 details from settings.json');
}

var STS = new AWS.STS(); // Using the AWS SDK to retrieve temporary credentials

S3 = new AWS.S3();

export { s3Conf, STS, S3 };