import '../collections.js';

Meteor.publish('generalsetting', function() {
  console.log("subscribe general setting ");
  // parameter validations
  
  return GeneralSetting.find({}, {
    limit: 1,
  });
});