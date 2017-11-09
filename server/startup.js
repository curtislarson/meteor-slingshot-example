import { s3Conf } from './s3-details.js';

AWS.config.update({
  accessKeyId: s3Conf.key,
  secretAccessKey: s3Conf.secret,
});

STS = new AWS.STS();

S3 = new AWS.S3();
