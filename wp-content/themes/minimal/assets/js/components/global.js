module.exports = function() {
	
	var settings;
	
	return {
		
		settings: {
			
		},
		
		init: function() {
			
			settings = this.settings;
			
			this.bindUI();
		},
		
		bindUI: function() {
			
			if (jQuery("p:first").text() == "Problem statement:") {
				jQuery(".single-piece-description p:first").first().addClass('problem-statement');
			}
		}
	}
}