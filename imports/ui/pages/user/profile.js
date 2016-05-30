import '../../../lib/helpers/formatter.js';
import './profile.html';

Template.user_profile.onRendered(function() {
	var self = this;
	$('#change_profile_form').validate({
		rules: {
			name: "required"
		},
		messages: {
			name: {
				required: "Please enter Your full name"
			}
		},
		submitHandler() {
			let doc = {				
				profile: {
					name: self.find("[name='name']").value,
					updatedAt: new Date()
				}
			};
	      	
	      	Meteor.users.update(Meteor.user()._id, {
	            $set: doc
	        }, function(err) {
	            if (err) {
	                sAlert.error(err.message);
	                throw new Meteor.Error(err.message);
	            } else {
	            	sAlert.success('Profile successfully changed');
	            	self.find('[name="name"]').focus();
	        	}
	        });
	    }
	});

	$('#change_password_form').validate({
		rules: {
			oldPassword: "required",
			newPassword: {
				required: true,
				minlength: 6
			},
			confirmNewPassword: {
				required: true,
				equalTo: "#newPassword"
			}
		},
		messages: {
			oldPassword: {
	        	required: "Please enter Your old password"
	      	},
	      	newPassword: {
	        	required: "Please enter Your new password"
	      	},	 
		},
		submitHandler() {
			let oldPassword = self.find('[name="oldPassword"]').value;
			let newPassword = self.find('[name="newPassword"]').value;
	      	
	      	Accounts.changePassword(oldPassword, newPassword, function(err) {
	            if (err) {
	                sAlert.error(err.message);
	                throw new Meteor.Error(err.message);
	            } else {
	                sAlert.success('Password successfully changed');
	                $('#change_password_form')[0].reset();
	                self.find('#oldPassword').focus();
	            }
	        });
	    }
	});
});

Template.user_profile.helpers({
	model: function() {
		return Meteor.user() ? Meteor.user() : null;
	}
});

Template.user_profile.events({
	'submit form': ( event ) => {
	    event.preventDefault();
	}
});