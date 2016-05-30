AsteroidRouting = {};

AsteroidRouting = {
	getId: () => {
		return FlowRouter.getParam('id') ? FlowRouter.getParam('id') : null;
	}	
};