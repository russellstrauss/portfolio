(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
module.exports = function() {
	
	var settings;
	
	return {
		
		settings: {
			
		},
		
		init: function() {
			
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
			
		}
	}
}
},{}],4:[function(require,module,exports){
var Global = require('./components/global.js');
var PhotoGrid = require('./components/photo-grid.js');
var Videos = require('./components/videos.js');
var Utilities = require('./utils.js');

(function () {
	
	$(document).ready(function() {
				
		Global().init();
		PhotoGrid().init();
		Videos().init();
		
		$(window).trigger('resize');
	
	});
	
})();
},{"./components/global.js":1,"./components/photo-grid.js":2,"./components/videos.js":3,"./utils.js":5}],5:[function(require,module,exports){
(function () {
	
	var appSettings;
	
	window.utils = (function() {
		
		return {
			appSettings: {
				mobileMax: 767,
				tabletMin: 768,
				tabletMax: 991,
				desktopMin: 992,
				desktopLargeMin: 1200
			},
			
			mobile: function() {
				return window.innerWidth < appSettings.tabletMin;
			},
			
			tablet: function() {
				return (window.innerWidth > appSettings.mobileMax && window.innerWidth < appSettings.desktopMin);
			},
			
			getBreakpoint: function() {
				if (window.innerWidth < appSettings.tabletMin) return 'mobile';
				else if (window.innerWidth < appSettings.desktopMin) return 'tablet';
				else return 'desktop';
			},
			
			debounce: function(func, wait, immediate) {
				var timeout;
				return function () {
					var context = this, args = arguments;
					var later = function () {
						timeout = null;
						if (!immediate) func.apply(context, args);
					};
					var callNow = immediate && !timeout;
					clearTimeout(timeout);
					timeout = setTimeout(later, wait);
					if (callNow) func.apply(context, args);
				};
			},
			
			/* Purpose: Detect if any of the element is currently within the viewport */
			anyOnScreen: function(element) {

				var win = $(window);
				
				var viewport = {
					top: win.scrollTop(),
					left: win.scrollLeft()
				};
				viewport.right = viewport.left + win.width();
				viewport.bottom = viewport.top + win.height();

				var bounds = element.offset();
				bounds.right = bounds.left + element.outerWidth();
				bounds.bottom = bounds.top + element.outerHeight();

				return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

			},
			
			/* Purpose: Detect if an element is vertically on screen; if the top and bottom of the element are both within the viewport. */
			allOnScreen: function(element) {

				var win = $(window);
				
				var viewport = {
					top: win.scrollTop(),
					left: win.scrollLeft()
				};
				viewport.right = viewport.left + win.width();
				viewport.bottom = viewport.top + win.height();

				var bounds = element.offset();
				bounds.right = bounds.left + element.outerWidth();
				bounds.bottom = bounds.top + element.outerHeight();

				return (!(viewport.bottom < bounds.top && viewport.top > bounds.bottom));

			},
			
			secondsToMilliseconds: function(seconds) {
				return seconds * 1000;
			},
			
			/*
			* Purpose: This method allows you to temporarily disable an an element's transition so you can modify its proprties without having it animate those changing properties.
			* Params:
			* 	-element: The element you would like to modify.
			* 	-cssTransformation: The css transformation you would like to make, i.e. {'width': 0, 'height': 0} or 'border', '1px solid black'
			*/
			getTransitionDuration: function(element) {
				var $element = $(element);
				return utils.secondsToMilliseconds(parseFloat(getComputedStyle($element[0])['transitionDuration']));
			}
		}
	})();

	module.exports = window.utils;

})();
},{}]},{},[4]);
