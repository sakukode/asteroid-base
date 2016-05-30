import '../../../server/helpers/check.js';
import '../../../lib/helpers/sorting.js';

Meteor.publishComposite('users', function(criteria, limit, skipCount, sortField, sortDirection) {
  console.log("subscribe users");
  var loggedInUserId = this.userId;
  // parameter validations
  check(skipCount, AsteroidCheck.positiveIntegerCheck);
  check(sortField, String);
  check(sortDirection, AsteroidCheck.sortDirectionCheck)

  criteria['_id'] = {$ne: loggedInUserId};
  
  return {
    find: function() {
        return Meteor.users.find(criteria, {
          limit: parseInt(limit),
          skip: skipCount,
          sort: AsteroidSorting.get(sortField, sortDirection)
        });
    },
    children: [
    ] 
  }
});

Meteor.publish('user', function(doc) {
  console.log("subscribe user " + doc);
  // parameter validations
  
  return Meteor.users.find(doc, {
    limit: 1,
  });
  
});

FindFromPublication.publish('checkUsers', function(criteria, skipCount, sortField, sortDirection) {
  console.log("subscribe checkUsers " + skipCount);

  var loggedInUserId = this.userId;
  // parameter validations
  check(skipCount, AsteroidCheck.positiveIntegerCheck);
  check(sortField, String);
  check(sortDirection, AsteroidCheck.sortDirectionCheck)
  criteria['_id'] = {$ne: loggedInUserId};

  return Meteor.users.find(criteria, {
    fields: {'profile.name': 1},
    limit: 1,
    skip: skipCount,
    sort: AsteroidSorting.get(sortField, sortDirection)
  });
});