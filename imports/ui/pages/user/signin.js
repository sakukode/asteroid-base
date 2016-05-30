import './signin.html';

Template.userSignin.onRendered(function() {
	var self = this;
	$( "#user-signin" ).validate({
		rules: {
			email: { 
				required: true,
				email: true
			},
			password: "required",
		},
		messages: {
	      	email: {
        		required: "Please enter your email address to login.",
        		email: "Please enter a valid email address."
	      	},
      		password: {
        		required: "Please enter your password to login."
      		}
	    },
	    submitHandler() {
			let user = {
				email: self.find("[name='email']").value,
				password: self.find("[name='password']").value
			};

	        Meteor.loginWithPassword(user.email, user.password, function(err) {
	            if (err) {
	                sAlert.error(err.message);
	            }	          
	        });
	    }
	});
});

Template.userSignin.events({
	'click #btn-signup': function(event, template) {
		event.preventDefault();
		FlowRouter.go('signUp');
	},
	'submit form': ( event ) => {
	    event.preventDefault();
	},
	'click .btn-facebook': function(event) {
		event.preventDefault();

		Meteor.loginWithFacebook({}, function(err){
            if (err) {
            	sAlert.error("Facebook login failed");
                throw new Meteor.Error("Facebook login failed");
            }
        });
	}
});