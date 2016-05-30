AsteroidSorting = {
    /**
     * Helpers to get current page from parameter
     * @return {[type]} [description]
     */
    getCurrentPage: function() {
      return parseInt(FlowRouter.getQueryParam('page')) || 1; 
    },
    getPreviousPage: function(additionalParams) {
      var self = this;
      var previousPage = self.getCurrentPage() === 1 ? 1 : self.getCurrentPage() - 1;
      var currentPath = FlowRouter.current().path;
      var params = {
        page: previousPage,
        by: self.getSortField(),
        sort: self.getSortDirection()
      };

      //if additional param is exist
      if(additionalParams) {
        if(additionalParams.constructor === Array) {
          _.each(additionalParams, function(param) {
              params[param.label] = param.value;
          });
        } else {
          params[additionalParams.label] = additionalParams.value;
        }
      }
        
      if (currentPath)
          currentPath = FlowRouter.current().path.split("?")[0];

      return FlowRouter.path(currentPath, {}, params);
    },
    getNextPage: function(hasmore, additionalParams) {
      var self = this;
      var nextPage = hasmore ? self.getCurrentPage() + 1 : self.getCurrentPage();
      var currentPath = FlowRouter.current().path;
      var params = {
        page: nextPage,
        by: self.getSortField(),
        sort: self.getSortDirection()
      };

      //if additional param is exist
      if(additionalParams) {
        if(additionalParams.constructor === Array) {
          _.each(additionalParams, function(param) {
              params[param.label] = param.value;
          });
        } else {
          params[additionalParams.label] = additionalParams.value;
        }
      }
        
      if (currentPath)
          currentPath = FlowRouter.current().path.split("?")[0];

      return FlowRouter.path(currentPath, {}, params);
    },
    getPreviousPageClass: function() {
      return this.getCurrentPage() <= 1 ? "disabled" : "";
    },
    getNextPageClass: function(hasmore) {
      return hasmore ? "" : "disabled";
    },
    by: function(sortField, additionalParams) {
      var self = this;
      var currentPath = FlowRouter.current().path;
      var params = {
        page: self.getCurrentPage(),
        by: sortField,
        sort: self.toggleSortDirection(sortField)
      };
      
      //if additional param is exist
      if(additionalParams) {
        if(additionalParams.constructor === Array) {
          _.each(additionalParams, function(param) {
              params[param.label] = param.value;
          });
        } else {
          params[additionalParams.label] = additionalParams.value;
        }
      }
        
      if (currentPath)
          currentPath = FlowRouter.current().path.split("?")[0];

      FlowRouter.go(currentPath, {}, params);
    },
    /**
     * Helper to get Sort Parameters for option sort find collection
     * @param  {[type]} sortField     [description]
     * @param  {[type]} sortDirection [description]
     * @return {[type]}               [description]
     */
    get: function(sortField, sortDirection) {
      var sort = [];
      var direction = sortDirection || 'desc'; //if direction not exist, set sort direction default to ascending
      var field = sortField || 'createdAt'; //if field not exist, set sort field default to createdDate

      //push to option sort
      sort.push([field, direction]);

      return sort;
    },
    /**
     * Helpers to get sort field from query param [Flow Router]
     * @return {[type]} [description]
     */
    getSortField: function() {
      return FlowRouter.getQueryParam('by') || 'createdAt';
    },
    /**
     * Helpers to get sort direction (ascending or descending) from query param [Flow Router]
     * @return {[type]} [description]
     */
    getSortDirection: function() {
      return FlowRouter.getQueryParam('sort') || 'desc'; //default sort ascending if params sort direction null
    },
    /**
     * Helpers to get toggle sort direction 'ascending' or 'descending'
     * @param  {[type]} sortBy [description]
     * @return {[type]}        [description]
     */
    toggleSortDirection: function(sortBy) {
      if (this.getSortField() !== sortBy) {
        return 'asc';
      } else {
        if (this.getSortDirection() === 'asc') {
          return 'desc';
        } else {
          return 'asc';
        }
      }
    },
    /**
     * Helpers to get sort icon class (need package fontawesome)
     * @param  {[type]} element [description]
     * @return {[type]}         [description]
     */
    getSortIconClass: function(element) {
      if (this.getSortField() === element) {
        return this.getSortDirection() === "asc" ? 
          "fa fa-sort-asc" : "fa fa-sort-desc";
      } else {
        return "fa fa-sort";
      }
    }
};