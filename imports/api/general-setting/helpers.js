import './collections.js';

if(Meteor.isClient) {
	Meteor.subscribe('generalsetting');
}

/** Helper To Get General Setting for collection */
AsteroidSetting = {
	get: function(option) {
		var setting = GeneralSetting.findOne({});

		if(setting) {
			return setting[option];
		}
	}
};

/**
 * Helper template blaze for get setting property
 */
UI.registerHelper('asteroid_setting', function(option) {
    return AsteroidSetting.get(option);
});
