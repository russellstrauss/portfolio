var Global = require('./components/global.js');
var PhotoGrid = require('./components/photo-grid.js');
var Videos = require('./components/videos.js');
var Utilities = require('./utils.js');

(function () {
	
	$(document).ready(function() {
				
		Global().init();
		PhotoGrid().init();
		Videos().init();
		
		$(window).trigger('resize');
	
	});
	
})();