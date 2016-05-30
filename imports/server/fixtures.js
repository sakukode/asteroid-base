import '../api/menu/collections.js';

Meteor.startup(function() {
	if(Meteor.users.find().count() < 100){
		_.each(_.range(100), function() {
			var randomEmail = faker.internet.email();
			var randomName = faker.name.findName();
			var userName = faker.internet.userName();
			Accounts.createUser({
				username: userName,
				profile: {
					name: randomName,
				},
				email: randomEmail,
				password: 'password'
			});
		});
	}
});