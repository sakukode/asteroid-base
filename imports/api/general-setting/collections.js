GeneralSetting = new Mongo.Collection('general_setting');

GeneralSetting.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});

GeneralSettingSchema = new SimpleSchema({
	sitename: {
		type: String,
		label: "Site Name"
	},
	company: {
		type: String,
		label: "Company"
	},
	email: {
		type: String,
		label: "Email",
		optional: true
	},
	logo: {
		type: String,
		label: "Logo",
		optional: true
	},
	miniLogo: {
		type: String,
		label: "Mini Logo",
		optional: true
	},
	phone: {
		type: String,
		label: "Phone",
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


GeneralSetting.attachSchema( GeneralSettingSchema );

if (Meteor.isServer) {
	Meteor.startup(function() {
		/** Insert Default General Setting */
		//console.log("insert default general setting");
		var setting = GeneralSetting.findOne({});

		if(!setting) {
			GeneralSetting.insert({
				sitename: "Site Name",
				company: "Company",
				email: "sites@example.com",				
			}, function(err, res) {
				if(err) {
					throw new Meteor.Error(err);
				} else {
					console.log("success insert general setting");
				}
			});
		}
	});
}

