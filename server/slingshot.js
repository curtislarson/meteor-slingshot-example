import { s3Conf, STS } from './s3-details.js';

Slingshot.createDirective("imageUploader", Slingshot.S3Storage.TempCredentials, {
  bucket: s3Conf.bucket,
  region: s3Conf.region,
  acl: "public-read",

  authorize: function() {
    if (!this.userId) {
      const message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }
    return true;
  },

  temporaryCredentials: Meteor.wrapAsync(function(expire, callback) {
    const duration = Math.max(Math.round(expire / 1000), 900);

    STS.getSessionToken({
      DurationSeconds: duration,
    }, function(error, result) {
      callback(error, result && result.Credentials);
    });
  }),

  key: function(file) {
    // Folder where files will be uploaded:
    const directory = "uploads" + "/"
    const rand = Math.floor(Math.random() * 9000000) + 1000000;
    const name = file.name;
    const idx = name.lastIndexOf(".");
    const noExtension = name.substring(0, idx);
    const extension = name.substring(idx, name.length);
    return directory + "husd-" + noExtension + "-" + rand + extension;
  },
});
