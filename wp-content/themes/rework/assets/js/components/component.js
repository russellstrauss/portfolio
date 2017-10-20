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
			
			// Remove <br>'s and <p>'s from photo grid
			$('.photo-thumbnails').find('br').remove()
			$('.photo-thumbnails').find('p').remove()
			
			// Find all YouTube videos
			var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com']"),
			
				// The element that is fluid width
				$fluidEl = $(".single-piece-description");
			
			// Figure out and save aspect ratio for each video
			$allVideos.each(function() {
			
				$(this)
				.data('aspectRatio', this.height / this.width)
			
				// and remove the hard coded width/height
				.removeAttr('height')
				.removeAttr('width');
			
			});
			
			// When the window is resized
			$(window).resize(function() {
			
				var newWidth = $fluidEl.width();
			
				// Resize all videos according to their own aspect ratio
				$allVideos.each(function() {
			
				var $el = $(this);
				$el
					.width(newWidth)
					.height(newWidth * $el.data('aspectRatio'));
			
				});
			
			// Kick off one resize to fix all videos on page load
			}).resize();
		}
	}
}