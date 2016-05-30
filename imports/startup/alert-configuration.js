Meteor.startup(function () {

    sAlert.config({
        effect: 'stackslide',
        position: 'bottom-right',
        timeout: 3000,
        html: false,
        onRouteClose: true,
        stack: true,   
        offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false,     
        onClose: _.noop //
        // examples:
        // onClose: function() {
        //     /* Code here will be executed once the alert closes. */
        // }
    });

});