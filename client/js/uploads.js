Template.uploads.onCreated(function() {
  const instance = this;

  instance.uploadsLoaded = new ReactiveVar(false);

  instance.autorun(function() {
    const handle = instance.subscribe("uploads");
    if (handle.ready()) {
      instance.uploadsLoaded.set(true);
    }
  });

  instance.uploads = function() {
    if (instance.uploadsLoaded.get()) {
      return Uploads.find({}).fetch();
    }
    return [];
  };
});

Template.uploads.events({
  "click .delete-upload": function() {
    Meteor.call("deleteUpload", this._id, function(err, resp) {
      if (err) {
        console.log("Error deleting upload", err);
      }
    });
  },
});

Template.uploads.helpers({
  uploads: function() {
    return Template.instance().uploads();
  },
  isOwner: function() {
    return Meteor.userId() === this.owner;
  },
});
