
Meteor.startup(function() {
	const setting = Meteor.settings.private;

	ServiceConfiguration.configurations.remove({
	    service: 'facebook'
	});
	 
	ServiceConfiguration.configurations.insert({
	    service: 'facebook',
	    appId: setting.facebook.appId,
	    secret: setting.facebook.secret
	});
});
