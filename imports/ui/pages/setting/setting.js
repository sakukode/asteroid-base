import '../../../api/general-setting/collections.js';
import './setting.html';

Template.setting.onCreated(function() {
	this.subscribe('generalsetting');
});

Template.setting.helpers({
	setting: function() {
		return GeneralSetting.findOne({});
	}
});
