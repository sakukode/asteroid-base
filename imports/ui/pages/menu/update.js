import '../../../api/menu/collections.js';
import '../../../lib/helpers/routing.js';
import './update.html';

Template.menu_update.onCreated(function() {
	var self = this;
	self.autorun(function() {
		var id = AsteroidRouting.getId();
		self.subscribe('menu', id);
	});
});

Template.menu_update.helpers({
	model: function() {
		var id = AsteroidRouting.getId();
		return Menu.findOne(id);
	}
});
