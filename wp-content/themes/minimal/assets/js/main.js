var Nav = require('./components/nav.js');
var AnimatedSphereWireframe = require('./components/animated-sphere-wireframe.js');
var PhotoGrid = require('./components/photo-grid.js');
var Videos = require('./components/videos.js');
var Resume = require('./components/resume.js');
var Global = require('./components/global.js');
var Utilities = require('./utils.js');

(function () {
	
	$(document).ready(function() {
				
		PhotoGrid().init();
		Nav().init();
		Videos().init();
		Resume().init();
		Global().init();
		AnimatedSphereWireframe().init();
	
	});
	
})();