import '../../../api/menu/collections.js';
import '../../../lib/helpers/routing.js';
import './view.html';

Template.menu_view.onCreated(function() {
	var self = this;
	self.autorun(function() {
		var id = AsteroidRouting.getId();
		self.subscribe('menu', id);
	});
});

Template.menu_view.helpers({
	model: function() {
		var id = AsteroidRouting.getId();
		return Menu.findOne(id);
	}
});
