/**
 * Helpers User
 * @type {Object}
 */
UserController =  {
  getCriteria: function() {
    var search = FlowRouter.getQueryParam('search') ? FlowRouter.getQueryParam('search') : "";
    var criteria = {};
    if (search) {
      criteria = {
        $or: [{
          'profile.name': {
            $regex: search,
            $options: 'i'
          }
        }, {
          'emails.address': {
            $regex: search,
            $options: 'i'
          }
        }, ]
      }
    }

    return criteria;
  },
  getSearch: function() {
    return FlowRouter.getQueryParam('search') ? FlowRouter.getQueryParam('search') : "";
  },
  getAdditionalParams: function() {
      var search = FlowRouter.getQueryParam('search') ? FlowRouter.getQueryParam('search') : "";
      return {
        label: 'search',
        value: search
      };
  },
  search: function(template) {
    FlowRouter.go('userIndex', {}, {
      page: 1,
      by: AsteroidSorting.getSortField(),
      sort: AsteroidSorting.getSortDirection(),
      search: template.find('#search').value
    });
  }
};