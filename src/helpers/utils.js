(function () {
	
	window.utils = (function() {
		
		return {
			
			breakpoints: {
				mobileMax: 767,
				tabletMin: 768,
				tabletMax: 991,
				desktopMin: 992,
				desktopLargeMin: 1200
			},
			
			mobile: function() {
				return window.innerWidth < this.breakpoints.tabletMin;
			},
			
			tablet: function() {
				return (window.innerWidth > this.breakpoints.mobileMax && window.innerWidth < this.breakpoints.desktopMin);
			},
			
			touchScreen: function() { // is mobile or tablet
				return window.innerWidth < this.breakpoints.desktopMin;
			},
			
			desktop: function() {
				return window.innerWidth > this.breakpoints.desktopMin;
			},
			
			throttle: function(func, wait, immediate) { // throttle function calls by parameter wait milliseconds
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
				return utils.secondsToMilliseconds(parseFloat(getComputedStyle($element[0]).transitionDuration));
			},
			
			isInteger: function(number) {
				return number % 1 === 0;
			},
			
			insertAfter: function(existingElement, newElement) {
				
				if (existingElement && newElement) {
					
					existingElement.parentNode.insertBefore(newElement, existingElement.nextSibling);
				}
			}
		};
	})();

	module.exports = window.utils;
})();