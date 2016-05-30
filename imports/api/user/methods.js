Meteor.methods({
	'User.insert'(doc) {
		check(doc.username, String);
		check(doc.email, String);
		check(doc.profile.name, String);
		check(doc.password, String);

		return Accounts.createUser(doc);  
	},
	'User.update'(_id, doc) {
		check(_id, String);
		check(doc.profile.name, String);

		return Meteor.users.update(_id, {
            $set: doc
        }, function(err) {
            if (error) {                
                throw new Meteor.Error(error);
            }
           
        });
	},
	'User.remove'(_id) {
		check(_id, String);

		//Make sure the user is logged in before inserting a task
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Meteor.users.remove(_id, function(err) {
            if (err) {                
                throw new Meteor.Error(err);
            }            
        });
	}
});