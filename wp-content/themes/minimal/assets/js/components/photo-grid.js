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
			
			// Remove <br>'s and <p>'s from photo grid
			jQuery('.photo-thumbnails .photo-thumb').find('br').remove()
			jQuery('.photo-thumbnails').find('p').remove()
		
		}
	}
}