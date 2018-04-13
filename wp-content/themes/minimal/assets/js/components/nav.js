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
						
			$('#category-container').find('.portfolio-category').each(function(i) {
				var $menuItem = $(this);
				
				setTimeout(function() {
					$menuItem.css({'margin-left': '0', 'opacity': 1});
				}, i * 75);
			});
						
			if ($('body').hasClass('front-page')) {
				$('.name a').addClass('swipe active');
				
				$('nav.main ul li').each(function(i) {
					var $menuItem = $(this);
					
					setTimeout(function() {
						$menuItem.css({'margin-top': 0, 'opacity': 1});
					}, (i * 250) + (utils.appSettings.titleFadeInLength + utils.appSettings.menuFadeInDelay));
				});
			}
		}
	}
}