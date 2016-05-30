import '../../../api/user/methods.js';
import '../../../lib/helpers/routing.js';
import './update.html';

Template.user_update.onCreated(function() {
	var self = this;
	self.autorun(function() {
		var id = AsteroidRouting.getId();
		self.subscribe('user', id);
	});
});

Template.user_update.onRendered(function() {
	var self = this;

	/**
	 * Action Update User
	 */
	$('#users_form_update').validate({
		rules: {			
			name: "required"
		},
		messages: {			
			name: {
				required: "Please Enter name"
			}
		},
		submitHandler() {
			var id = AsteroidRouting.getId();
			let doc = {				
	            profile: {
	                name: self.find('[name="name"]').value,
	                updatedAt: new Date()	                
	            }
			};

			Meteor.call("User.update", id, doc, function(error, result) {
				if(error) {
					sAlert.error(error.message);
					throw new Meteor.Error(error.message);
				} else {					
					FlowRouter.go('userIndex');
					sAlert.success("Successfully updating data");
				}
			});
		}
	});
});

Template.user_update.events({    
    'submit form': (event) => {
    	event.preventDefault();
    }
});

Template.user_update.helpers({
	model: function() {
		var id = AsteroidRouting.getId();		
		return Meteor.users.findOne(id);
	}
});

