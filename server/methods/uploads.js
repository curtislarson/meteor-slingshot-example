import { s3Conf } from '../s3-details.js';

Meteor.methods({
  deleteUpload: function(id) {
    if (!this.userId) {
      throw new Meteor.Error("unauthorized", "Unauthorized");
    }

    var upload = Uploads.findOne({_id: id, owner: this.userId});

    if (!upload) {
      throw new Meteor.Error("missing-data", "Upload not found");
    }
    // Delete from s3
    var resp = S3.deleteObjectSync({
      Bucket: s3Conf.bucket,
      Key: upload.key,
    });

    // Delete from collection
    Uploads.remove({_id: id});
  },

  saveUpload: function(url) {
    if (!this.userId) {
      throw new Meteor.Error("unauthorized", "Unauthorized");
    }

    var split = url.split("/");

    Uploads.insert({
      owner: this.userId,
      url: url,
      key: split[split.length - 1],
    });
  },
});
