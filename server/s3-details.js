const s3Conf = Meteor.settings.s3 || {};

if (s3Conf && s3Conf.key && s3Conf.secret && s3Conf.bucket && s3Conf.region) {
    console.log('Found AWS S3 details');
} else {
    console.error('Error: unable to find AWS S3 details in settings.json');
}

export { s3Conf };