var Component = require('./components/component.js');
var Menu = require('./components/menu.js');
var AnimatedSphereWireframe = require('./components/animated-sphere-wireframe.js')
var Utilities = require('./utils.js');

(function () {
	
	$(document).ready(function() {
				
		Component().init();
		Menu().init();
		
		if ($('#sphereWireframe').length > 0) {
			AnimatedSphereWireframe().init();
		}
		
		$(window).trigger('resize');
	
	});
	
})();