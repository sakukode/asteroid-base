import './header.html';

Template.adminlte_header.events({
	'click #btn-logout': function(event, template) {
		event.preventDefault();
		Meteor.logout();
	},
	'click #btn-profile': function(event, template) {
		event.preventDefault();
		FlowRouter.go('userProfile');
	}
});