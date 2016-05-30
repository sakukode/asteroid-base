import '../collections.js';

/** Publication for create list menu on sidebar */
FindFromPublication.publish('menu_sidebar', function() {
  console.log("subscribe menu for sidebar ");

  return Menu.find({}, {
   	sort: {createdAt: 1} 
  });
});

/** Publication for get all data in page menu index **/
FindFromPublication.publish('menus', function(criteria, limit, skipCount, sortField, sortDirection) {
  console.log("subscribe menus " + limit);
  // parameter validations
  check(skipCount, AsteroidCheck.positiveIntegerCheck);
  check(sortField, String);
  check(sortDirection, AsteroidCheck.sortDirectionCheck)
  
  return Menu.find(criteria, {
    limit: parseInt(limit),
    skip: skipCount,
    sort: AsteroidSorting.get(sortField, sortDirection)
  });
  
});

/** Publication for get one data **/
Meteor.publish('menu', function(doc) {
  console.log("subscribe menu " + doc);
  // parameter validations
  
  return Menu.find(doc, {
    limit: 1,
  });
  
});

/** Publication for generate nextPage url **/
FindFromPublication.publish('checkMenus', function(criteria, skipCount, sortField, sortDirection) {
  console.log("subscribe checkMenus " + skipCount)
  // parameter validations
  check(skipCount, AsteroidCheck.positiveIntegerCheck);
  check(sortField, String);
  check(sortDirection, AsteroidCheck.sortDirectionCheck)


  return Menu.find(criteria, {
    fields: {'createdAt': 1},
    limit: 1,
    skip: skipCount,
    sort: AsteroidSorting.get(sortField, sortDirection)
  });
});