import './signup.html';

Template.userSignup.onRendered(function() {
	var self = this;
	$( "#user-signup" ).validate({
		rules: {
			fullName: "required",
			email: "required",
			password: {
				required: true,
				minlength: 6,
			},
			retypePassword: {
				required: true,
				equalTo: "#password"
			}
		},
		messages: {
	      	fullName: {
		        required: "Please enter Your full name!"
		    },
	      	email: {
	        	required: "Please enter Your email!"
	      	},
	      	password: {
	        	required: "Please enter Your password!"
	      	},
	      	retypePassword: {
	        	required: "Please Re type Your password!"
	      	},	  
	    },
	    submitHandler() {
			let doc = {
				email: self.find("[name='email']").value,
				password: self.find("[name='password']").value,
				profile: {
					name: self.find("[name='fullName']").value,
					createdAt: new Date()
				}
			};

	      	Accounts.createUser(doc, function(err) {
	            if (err) {
	                sAlert.error(err.message);
	                throw new Meteor.Error(err);
	            } else {	                
	                FlowRouter.go('signIn');
	                sAlert.success('successfully sign up');
	            }
	        });
	    }
	});
});

Template.userSignup.events({
	'click #btn-signin': function(event, template) {
		event.preventDefault();
		FlowRouter.go('signIn');
	},
	'submit form': ( event ) => {
	    event.preventDefault();
	}
});
