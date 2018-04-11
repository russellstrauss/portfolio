var Global = require('./components/global.js');
var Utilities = require('./utils.js');

(function () {
	
	$(document).ready(function() {
				
		Global().init();
		
		$(window).trigger('resize');
	
	});
	
})();