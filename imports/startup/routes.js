import '../ui/layouts';
import '../ui/pages';

if (Meteor.isClient) {
	Accounts.onLogin(function() {
		FlowRouter.go('home');
	});

	Accounts.onLogout(function() {
		FlowRouter.go('signIn');
	});
}

function trackRouteEntry(context) {
  	if(!Meteor.userId()) {
		FlowRouter.go('signIn');
	}
}

var adminPrivateRoutes = FlowRouter.group({
  prefix: '/admin',
  triggersEnter: [trackRouteEntry],
});

var adminPublicRoutes = FlowRouter.group({
  prefix: '/admin',
});

FlowRouter.notFound = {
    action: function() {
    	if(!Meteor.userId()) {
    		FlowRouter.go('signIn');
    	}

    	BlazeLayout.render('adminlte_mainLayout', {content: 'adminlte_notfound'});
    }
};

FlowRouter.route('/', {
	action() {
		if(Meteor.userId()) {
			FlowRouter.go('home');
		} else {
			FlowRouter.go('signIn');
		}
	}
});

adminPublicRoutes.route('/sign-in', {
	name: 'signIn',
	action() {
		if(Meteor.userId()) {
			FlowRouter.go('home');
		}

		BlazeLayout.render('adminlte_authLayout', {content: 'userSignin'});
	}
});

adminPublicRoutes.route('/sign-up', {
	name: 'signUp',
	action() {
		if(Meteor.userId()) {
			FlowRouter.go('home');
		}

		BlazeLayout.render('adminlte_authLayout', {content: 'userSignup'});
	}
});

adminPrivateRoutes.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('adminlte_mainLayout', {content: 'home'});
	}
});

/** USER ROUTING */
adminPrivateRoutes.route('/user', {
	name: 'userIndex',
	action() {
		BlazeLayout.render('adminlte_mainLayout', {content: 'user_index'});
	}
});

adminPrivateRoutes.route('/user/profile', {
	name: 'userProfile',
	action() {
		BlazeLayout.render('adminlte_mainLayout', {content: 'user_profile'});
	}
});

adminPrivateRoutes.route('/user/insert', {
	name: 'userInsert',
	action() {
		BlazeLayout.render('adminlte_mainLayout', {content: 'user_insert'});
	}
});

adminPrivateRoutes.route('/user/update/:id', {
	name: 'userUpdate',
	action() {
		BlazeLayout.render('adminlte_mainLayout', {content: 'user_update'});
	}
});
/** EOF USER ROUTING */

/** SETTING ROUTING */
adminPrivateRoutes.route('/setting', {
	name: 'setting',
	action() {
		BlazeLayout.render('adminlte_mainLayout', {content: 'setting'});
	}
});
/** EOF SETTING ROUTING */

/** MENU ROUTING */
adminPrivateRoutes.route('/menu', {
	name: 'menuIndex',
	action() {
		BlazeLayout.render('adminlte_mainLayout', {content: 'menu_index'});
	}
});

adminPrivateRoutes.route('/menu/insert', {
	name: 'menuInsert',
	action() {
		BlazeLayout.render('adminlte_mainLayout', {content: 'menu_insert'});
	}
});
adminPrivateRoutes.route('/menu/update/:id', {
	name: 'menuUpdate',
	action() {
		BlazeLayout.render('adminlte_mainLayout', {content: 'menu_update'});
	}
});
adminPrivateRoutes.route('/menu/:id', {
	name: 'menuView',
	action() {
		BlazeLayout.render('adminlte_mainLayout', {content: 'menu_view'});
	}
});
/** EOF MENU ROUTING */