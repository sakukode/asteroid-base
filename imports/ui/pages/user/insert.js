import '../../../api/user/methods.js';
import '../../../lib/helpers/routing.js';
import './insert.html';

Template.user_insert.onCreated(function() {
    var self = this;
      
});

Template.user_insert.onRendered(function() {
	var self = this;

	/*
	 * Action Insert user
	 */
	$('#users_form_insert').validate({
		rules: {
			username: "required",
			email: "required",
			password: {
				required: true,
				minlength: 6
			},
			name: "required"
		},
		messages: {
			username: {
				required: "Please Enter username"
			},
			email: {
				required: "Please Enter email"
			},
			password: {
				required: "Please Enter password"
			},
			name: {
				required: "Please Enter name"
			}
		},
		submitHandler() {
			let doc = {
				username: self.find('[name="username"]').value,
				email: self.find('[name="email"]').value,
	            password: self.find('[name="password"]').value,
	            profile: {
	                name: self.find('[name="name"]').value,
	                createdAt: new Date()	                
	            }
			};

			Meteor.call("User.insert", doc, function(error, result) {
				if(error) {
					sAlert.error(error.message);
					throw new Meteor.Error(error.message);
				} else {					
					FlowRouter.go('userIndex');
					sAlert.success("Successfully adding data");
				}
			});
		}
	});
});

Template.user_insert.events({    
    'submit form': (event) => {
    	event.preventDefault();
    }
});