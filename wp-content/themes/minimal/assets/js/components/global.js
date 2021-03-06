module.exports = function() {
	
	var settings;
	
	return {
		
		settings: {
			
		},
		
		init: function() {
			
			settings = this.settings;
			
			this.bindUI();
			this.removeHardCodedImageAttributes();
		},
		
		bindUI: function() {
			
			if ($("p:first").text() == "Problem statement:") {
				$(".single-piece-description p:first").first().addClass('problem-statement');
			}
			
			$('.resume-content p').remove();
			$( 'p:empty' ).remove();
		},

		removeHardCodedImageAttributes: function() {

			var $images = $('img');
			$images.removeAttr('height');
			$images.removeAttr('width');
			$images.removeAttr('sizes');
		}
	};
};