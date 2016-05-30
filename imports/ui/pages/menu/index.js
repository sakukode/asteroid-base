import '../../../lib/helpers/sorting.js';
import '../../../lib/helpers/formatter.js';
//import '../../../api/menu/methods.js';
import '../../../api/menu/controllers.js';
import '../../components/paging.html';
import './index.html';


Template.menu_index.onCreated(function() {
  var self = this;
  self.increment = 10;

  self.autorun(function() {

    var criteria = MenuController.getCriteria();
    var skipCount = (AsteroidSorting.getCurrentPage() - 1) * self.increment;
    self.subscribe(
      'menus', 
      criteria,
      self.increment,
      skipCount, 
      AsteroidSorting.getSortField(),
      AsteroidSorting.getSortDirection()
    );

    var skipCountCheck = AsteroidSorting.getCurrentPage() * self.increment;

    self.subscribe(
      'checkMenus',  
      criteria,
      skipCountCheck, 
      AsteroidSorting.getSortField(),
      AsteroidSorting.getSortDirection()
    );	
  });
});

Template.menu_index.onRendered(function() {

});

Template.menu_index.helpers({
	models: function() {
		return Menu.findFromPublication('menus', {}, {
			sort: AsteroidSorting.get(
				AsteroidSorting.getSortField(),
				AsteroidSorting.getSortDirection())
		});
	},
	prevPage: function() {
    	var additionalParams = MenuController.getAdditionalParams();
		return AsteroidSorting.getPreviousPage(additionalParams);
	},
	nextPage: function() {
   		var additionalParams = MenuController.getAdditionalParams();
		return AsteroidSorting.getNextPage(hasMorePages(), additionalParams);
	},
	prevPageClass: function() {
		return AsteroidSorting.getPreviousPageClass();
	},
	nextPageClass: function() {
		return AsteroidSorting.getNextPageClass(hasMorePages());
	},
	nameIconClass: function() {
	    return AsteroidSorting.getSortIconClass("name");
	},
	createdAtIconClass: function() {
	    return AsteroidSorting.getSortIconClass("createdAt");
	},
});

Template.menu_index.events({
  'click #name,#createdAt': function(event) {
    event.preventDefault();

    if (event.target.id === 'name') {
      AsteroidSorting.by('name');
    } else if (event.target.id === 'createdAt') {
      AsteroidSorting.by('createdAt');
    }
  },
  'click #btn-insert': function( event ) {
		event.preventDefault();
		FlowRouter.go('menuInsert');
  },
  'click .btn-update': function(event) {
    event.preventDefault();
    FlowRouter.go('menuUpdate', {
      id: this._id
    });
  },
  'click .btn-view': function(event) {
    event.preventDefault();
    FlowRouter.go('menuView', {
      id: this._id
    });
  },
  'keyup #search': function(event, template) {
    MenuController.search(template);
  },
  'click .btn-remove': function(event) {
    event.preventDefault();
    if (confirm("Are you sure want to remove this data?")) {
      var id = this._id;
      Meteor.call('Menu.remove', id, function(error, result) {
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
	var models = Menu.findFromPublication('checkMenus', {}, {
      sort: AsteroidSorting.get(
        AsteroidSorting.getSortField(), 
        AsteroidSorting.getSortDirection())
    }).fetch();

	return models.length > 0 ? AsteroidSorting.getCurrentPage() * parseInt(15) : false;
};


