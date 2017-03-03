jQuery(document).ready(function () {
	if (jQuery("p:first").text() == "Problem statement:") {
		jQuery(".single-piece-description p:first").first().addClass('problem-statement');
	}
	
	jQuery(".category-content").fadeIn(1000, 'easeInExpo');
	
	
	// Remove <br>'s and <p>'s from photo grid
	jQuery('.photo-thumbnails').find('br').remove()
	jQuery('.photo-thumbnails').find('p').remove()
	
	
	
	
	
	
	
	
	// Find all YouTube videos
	var $allVideos = jQuery("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com']"),
	
	    // The element that is fluid width
	    $fluidEl = jQuery(".single-piece-description");
	
	// Figure out and save aspect ratio for each video
	$allVideos.each(function() {
	
	  jQuery(this)
	    .data('aspectRatio', this.height / this.width)
	
	    // and remove the hard coded width/height
	    .removeAttr('height')
	    .removeAttr('width');
	
	});
	
	// When the window is resized
	jQuery(window).resize(function() {
	
	  var newWidth = $fluidEl.width();
	
	  // Resize all videos according to their own aspect ratio
	  $allVideos.each(function() {
	
	    var $el = jQuery(this);
	    $el
	      .width(newWidth)
	      .height(newWidth * $el.data('aspectRatio'));
	
	  });
	
	// Kick off one resize to fix all videos on page load
	}).resize();
	
});
