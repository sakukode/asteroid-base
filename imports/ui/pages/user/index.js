import '../../../lib/helpers/sorting.js';
import '../../../lib/helpers/formatter.js';
import '../../../api/user/methods.js';
import '../../../api/user/controllers.js';
import './index.html';

Template.user_index.onCreated(function() {
  var self = this;
  self.increment = 10;

  self.autorun(function() {
    var criteria = UserController.getCriteria();
    var skipCount = (AsteroidSorting.getCurrentPage() - 1) * self.increment;
    self.subscribe(
      'users', 
      criteria,
      self.increment,
      skipCount, 
      AsteroidSorting.getSortField(),
      AsteroidSorting.getSortDirection()
    );

    var skipCountCheck = AsteroidSorting.getCurrentPage() * self.increment;

    self.subscribe(
      'checkUsers',  
      criteria,
      skipCountCheck, 
      AsteroidSorting.getSortField(),
      AsteroidSorting.getSortDirection()
    );	
  });
});

Template.user_index.helpers({
	models: function() {
    var limit = Template.instance().increment;
    var criteria = UserController.getCriteria();
		return Meteor.users.find(criteria, {
      limit: limit,
			sort: AsteroidSorting.get(
				AsteroidSorting.getSortField(),
				AsteroidSorting.getSortDirection())
		});
	},
	prevPage: function() {
    var additionalParams = UserController.getAdditionalParams();
		return AsteroidSorting.getPreviousPage(additionalParams);
	},
	nextPage: function() {
    var additionalParams = UserController.getAdditionalParams();
		return AsteroidSorting.getNextPage(hasMorePages(), additionalParams);
	},
	prevPageClass: function() {
		return AsteroidSorting.getPreviousPageClass();
	},
	nextPageClass: function() {
		return AsteroidSorting.getNextPageClass(hasMorePages());
	},
	usernameIconClass: function() {
	    return AsteroidSorting.getSortIconClass("username");
	},
	nameIconClass: function() {
	    return AsteroidSorting.getSortIconClass("name");
	},
	createdAtIconClass: function() {
	    return AsteroidSorting.getSortIconClass("createdAt");
	},
});

Template.user_index.events({
  'click #username,#email,#name,#createdAt': function(event) {
    event.preventDefault();
    var additionalParams = UserController.getAdditionalParams();

    if (event.target.id === 'username') {
      AsteroidSorting.by('username', additionalParams);
    } else if (event.target.id === 'name') {
      AsteroidSorting.by('profile.name', additionalParams);
    } else if (event.target.id === 'createdAt') {
      AsteroidSorting.by('createdAt', additionalParams);
    }
  },
  'click #btn-insert': function(event) {
    event.preventDefault();
    FlowRouter.go('userInsert');
  },
  'click .btn-update': function(event) {
    event.preventDefault();
    FlowRouter.go('userUpdate', {
      id: this._id
    });
  },
  'keyup #search': function(event, template) {
    UserController.search(template);
  },
  'click .btn-remove': function(event) {
    event.preventDefault();
    if (confirm("Are you sure want to remove this data?")) {
      var id = this._id;
      Meteor.call('User.remove', id, function(error, result) {
        if (error) {
          sAlert.error(error.message);
        } else {
          sAlert.success('Successfully removing data');
        }
      });
    }
  }
});

var hasMorePages = function() {
  var criteria = UserController.getCriteria();
	var models = Meteor.users.findFromPublication('checkUsers', criteria, {
      sort: AsteroidSorting.get(
        AsteroidSorting.getSortField(), 
        AsteroidSorting.getSortDirection())
    }).fetch();

	return models.length > 0 ? AsteroidSorting.getCurrentPage() * parseInt(15) : false;
};


