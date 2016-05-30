import '../../api/menu/collections.js';
import './sidebar.html';

Template.adminlte_sidebar.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('menu_sidebar');
	});
});

Template.adminlte_sidebar.helpers({
	menus: function() {		
		return Menu.findFromPublication( 'menu_sidebar', {}, {sort: {createdAt: 1}});
	}
});