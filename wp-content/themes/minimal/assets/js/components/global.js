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
			
			if ($("p:first").text() == "Problem statement:") {
				$(".single-piece-description p:first").first().addClass('problem-statement');
			}
			
			$('.resume-content p').remove();
			$( 'p:empty' ).remove();
		}
	};
};