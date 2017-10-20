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
			
			// Animate name in
			var $name = $('.name a span');
			$name.each(function(i) {
				
				var $letter = $(this);
				var fadeInInterval = 100;
				
				setTimeout(function(){
					$letter.css({'margin-left': '0', 'opacity': '1', 'transform': 'rotate(0deg)'});
				}, i*fadeInInterval);
				
				setTimeout(function() {
					fadeInMenu();
				}, ($name.length * fadeInInterval) + 800);
				
			});
			
			fadeInMenu = function() {
				var $menu = $('.menu-main-container ul li');
				var fadeInInterval = 200;
				
				$menu.each(function(i) {
					var $menuItem = $(this);
					setTimeout(function(){
						$menuItem.css({'margin-left': '0', 'opacity': '1'});
					}, i*fadeInInterval);
				});
				
				setTimeout(function() {
					fadeInWireframe();
				}, ($menu.length * fadeInInterval) + 800);
			};
			fadeInWireframe = function() {
				$('#sphereWireframe').css('opacity', '1');
			};
		}
	}
}