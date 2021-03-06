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
			
			$('nav.main ul li a').each(function() {

				var $link = $(this);

				utils.wrapCharacters($link, 'span');
			});

			if ($('body').hasClass('front-page')) {

				$('.name a').addClass('swipe active');

				$('nav.main ul li a span').each(function(i) {
					var $letter = $(this);
					
					setTimeout(function() {
						$letter.css({'margin-left': 0, 'opacity': 1, 'transform': 'none'});

					}, (i * 50) + (utils.appSettings.titleFadeInLength + utils.appSettings.menuFadeInDelay));
				});
			}
		}
	};
};