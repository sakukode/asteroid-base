Menu = new Mongo.Collection('menu');

Menu.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});

ChildMenus = new SimpleSchema({
	name: {
		type: String
	},
	url: {
		type: String,
		label: "Url"
	}
});

MenuSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
	url: {
		type: String,
		label: "Url",
		optional: true
	},
	childs: {
		type: [ChildMenus],
		optional: true
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			return new Date();
		},
		autoform: {
			type: "hidden"
		}
	}
});


Menu.attachSchema( MenuSchema );
