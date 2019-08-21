(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = function() {
	
	var settings;
		
	return {
		
		settings: {
			
		},
		
		init: function() {
			var scope = this;
			
			setTimeout(function() {
				$('#sphereWireframe').addClass('active');
				scope.triggerAnimation();
			}, utils.appSettings.titleFadeInLength + utils.appSettings.menuFadeInDelay + 1200);	
		},
		
		triggerAnimation: function() {
			
			settings = this.settings;
						
			if ($('#sphereWireframe').length < 1) {
				return;
			}
						
			var nodeBehindSphere = function(node, sphereMesh, edgeCaseMargin) {
				// edgeCaseMargin: If you want to change the value slightly so that nodes will show slightly before or after moving behind sphere rather than exactly when tangent lines are equal. Right now this value is based on three.js point distance
				edgeCaseMargin = edgeCaseMargin || 0;
				var radius = sphereMesh.geometry.parameters.radius;
				var D = camera.position.distanceTo(sphereMesh.position);
				var L = Math.sqrt(D*D - radius * radius);
				return (camera.position.distanceTo(node.position) > (L + edgeCaseMargin));
			};
			
			var interpolateNodeDistance = function(currentNode, closestNode, farthestNode) {
				// where Rn is the ratio calculated as a linear interpolation between R1 (max scale) and R2 (min scale) based on the distance. In other words, choose a scale, in this case between .25 and 1, and then figure out what the in-between value would be for that point that is closer than point 2, but farther than point 1. http://www.isda.org/c_and_a/pdf/Linear-interpolation-example.pdf
				
				var closestDistance = closestNode.position.distanceTo(camera.position);
				var farthestDistance = farthestNode.position.distanceTo(camera.position);
				var currentDistance = currentNode.position.distanceTo(camera.position);
				
				var R1 = 1; // Ratio of scale for closest node, aka original size
				var R2 = backgroundNodeScale; // Ratio of scale for farthest node
				var t1 = closestDistance;
				var t2 = farthestDistance;
				var tn = currentDistance;
				
				var Rn = R1 + ((R2 - R1)/(t2 - t1))*(tn - t1);
				
				return Rn;
			};
			
			function getRandom(min, max) {
				return (Math.random() * (max - min) + min);
			}
			
			var tempVector = new THREE.Vector3();
			var setUpNodes = function(i) {
				
				if (i == 0) { // initialize closest and farthest node variables
					isoMesh.userData.closestNode = nodes[0];
					isoMesh.userData.farthestNode = nodes[0];
				}
				// set closest node
				if (isoMesh.userData.closestNode.position.distanceTo(camera.position) > nodes[i].position.distanceTo(camera.position)) {
					isoMesh.userData.closestNode = nodes[i];
				}
				if (isoMesh.userData.farthestNode.position.distanceTo(camera.position) < nodes[i].position.distanceTo(camera.position)) {
					isoMesh.userData.farthestNode = nodes[i];
				}
				var distanceScale = interpolateNodeDistance(nodes[i], isoMesh.userData.closestNode, isoMesh.userData.farthestNode);
				nodes[i].scale.set(distanceScale, distanceScale, distanceScale);
				
				// Set inital positions of nodes
				tempVector.copy(isoMesh.geometry.vertices[i]);
				nodes[i].position.copy(isoMesh.localToWorld(tempVector));
				scene.add(nodes[nodes.length - 1]);
				
				// BUG: this not running correctly because of spehere position, opacity for backside nodes not set on initialize
				if (nodeBehindSphere(nodes[i], isoMesh, nodeVisibilityMargin)) { // hide initially if positioned on backside of sphere
					nodes[i].material.opacity = opacityFloor;
				}
				
				// Initialize fade flag variables
				nodes[i].userData.fadeInComplete = false;
				nodes[i].userData.fadeOutComplete = false;
			};
			
			var fadeBackgroundNodes = function(i) {
				// Fade out when triggering visibilty
				if (!nodeBehindSphere(nodes[i], isoMesh, nodeVisibilityMargin)) { // In front of the sphere
					if (!nodes[i].userData.fadeInComplete) { // if fade in not complete, decrease opacity
						nodes[i].material.opacity += fadeSpeed;
						if (nodes[i].material.opacity >= 1) { // once finished, reset values
							nodes[i].material.opacity = 1;
							nodes[i].userData.fadeInComplete = true;
							nodes[i].userData.fadeOutComplete = false;
						}
					}
				}
				else { // Now behind the sphere, begin fade;
												
					if (!nodes[i].userData.fadeOutComplete) {
						nodes[i].material.opacity -= fadeSpeed;
						if (nodes[i].material.opacity <= opacityFloor) {
							nodes[i].material.opacity = opacityFloor;
							nodes[i].userData.fadeOutComplete = true;
							nodes[i].userData.fadeInComplete = false;
						}
					}
				}
			};
			
			var interpolateScaleNodes = function(i) { 
				// Scale nodes based on distance from camera, but normalized so that moving camera won't affect scale
				
				// set closest and farthest node
				if (isoMesh.userData.closestNode.position.distanceTo(camera.position) > nodes[i].position.distanceTo(camera.position)) {
					isoMesh.userData.closestNode = nodes[i];
				}
				if (isoMesh.userData.farthestNode.position.distanceTo(camera.position) < nodes[i].position.distanceTo(camera.position)) {
					isoMesh.userData.farthestNode = nodes[i];
				}
				
				var distanceScale = interpolateNodeDistance(nodes[i], isoMesh.userData.closestNode, isoMesh.userData.farthestNode);
				nodes[i].scale.set(distanceScale, distanceScale, distanceScale);
			};
			
			var requestAnimationFrameID;
			var container, stats;
			var camera, scene, renderer;
			var raycaster, mouse, intersects, controls;
			var isoMesh;
			var nodes = [];
			var nodeRadius = 6;
			var isoRadius = 100;
			var opacityFloor = 0.3;
			var fadeSpeed = 0.04;
			var wireframeColor = 0xb8c0c8;
			var bgColor = 0xffffff;
			var nodeVisibilityMargin = 10;//50;
			var count = 0;
			var backgroundNodeScale = 0.6;
			var randomMovement = 0.001;
			
			init();
			animate();

			function init() {
				
				container = document.getElementById('sphereWireframe');
				
				var WIDTH = window.innerWidth,
				HEIGHT = window.innerHeight,
				FOV = 35,
				NEAR = 1,
				FAR = 1000;
				
				camera = new THREE.PerspectiveCamera(FOV, WIDTH / HEIGHT, NEAR, FAR);
				if (utils.mobile()) {
					camera.position.z = 500;
					camera.position.y = 80;
					camera.position.x = -70;
				}
				else {
					camera.position.z = 400;
					camera.position.y = 80;
					camera.position.x = -120;
				}

				scene = new THREE.Scene();

				isoGeometry = new THREE.IcosahedronGeometry(isoRadius, 1);
				var material = new THREE.MeshBasicMaterial({
					color: wireframeColor,
					wireframe: true
				});
				
				isoMesh = new THREE.Mesh(isoGeometry, material);
				scene.add(isoMesh);
				
				var nodeGeometry = new THREE.CircleGeometry(nodeRadius, 32);
				
				for (var i = 0; i < isoGeometry.vertices.length; ++i) {
					var nodeMaterial = new THREE.MeshBasicMaterial({
						color: wireframeColor,
						transparent: true
					});
					var nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
					nodes.push(nodeMesh);
					
					setUpNodes(i);
				}
				
				var planeGeometry = new THREE.PlaneBufferGeometry(1000, 1000, 1, 1);
				var planeMaterial = new THREE.MeshBasicMaterial({
					color: bgColor, 
					side: THREE.DoubleSide,
					transparent: true,
					opacity: 0.5
				});
				var plane = new THREE.Mesh(planeGeometry, planeMaterial);
				scene.add(plane);
				plane.translateZ( -1 * nodeVisibilityMargin );

				renderer = new THREE.WebGLRenderer({ antialias: true });
				renderer.setClearColor(bgColor);
				renderer.setSize(window.innerWidth, window.innerHeight);
				container.appendChild(renderer.domElement);
				//initControls();

				window.addEventListener('resize', onWindowResize, false);

			}

			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			}
			
			function initControls() { // need to import TrackballControls.js
				controls = new THREE.TrackballControls(camera, renderer.domElement);
				controls.rotateSpeed = 5.0; // need to speed it up a little
			}
			
			function updateVertices(){
				if (typeof isoMesh !== "undefined" && typeof nodes !== "undefined" && nodes.length === isoMesh.geometry.vertices.length) {
					
					if (count % 1000 == 0) {
						randomMovement = getRandom(-0.003, 0.003);
					}
					
					isoMesh.rotation.x += 0.002;
					isoMesh.rotation.y -= 0.003;
					isoMesh.rotation.z += randomMovement;
					
					if (isoMesh.rotation.x >= 360) isoMesh.rotation.x = 0;
					if (isoMesh.rotation.y >= 360) isoMesh.rotation.y = 0;
					
					for (var i = 0; i < nodes.length; ++i) {
						tempVector.copy(isoMesh.geometry.vertices[i]);
						nodes[i].position.copy(isoMesh.localToWorld(tempVector));
						//nodes[i].lookAt(camera.position);
						
						nodes[i].quaternion.copy( camera.quaternion ); // make nodes normal to camera viewing direction
						
						fadeBackgroundNodes(i);
						interpolateScaleNodes(i);
					}
				}
			}

			function animate() {
				
				try {								
					requestAnimationFrameID = requestAnimationFrame(animate);
					render();
					count++;
				}
				catch(error) {  
					console.log(error);
					cancelAnimationFrame(requestAnimationFrameID);
				}
			}

			function render() {

				if (typeof updateVertices !== "undefined") {
					updateVertices();
				}
				
				//controls.update();
								
				//camera.lookAt(scene.position);
				camera.updateMatrixWorld();
				renderer.render(scene, camera);
			}
		}
	};
};
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
			
			if ($("p:first").text() == "Problem statement:") {
				$(".single-piece-description p:first").first().addClass('problem-statement');
			}
			
			$('.resume-content p').remove();
			$( 'p:empty' ).remove();
		}
	};
};
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
			jQuery('.photo-thumbnails .photo-thumb').find('br').remove();
			jQuery('.photo-thumbnails').find('p').remove();
		
		}
	};
};
},{}],5:[function(require,module,exports){
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
						
			$('.print-icon').click(function() {
				window.print();
			});
		}
	};
};
},{}],6:[function(require,module,exports){
module.exports = function () {

	var settings;

	return {

		settings: {

		},

		init: function () {

			// Find all YouTube videos
			var $allVideos = jQuery("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com']"),

				// The element that is fluid width
				$fluidEl = jQuery(".single-piece-description");

			// Figure out and save aspect ratio for each video
			$allVideos.each(function () {

				jQuery(this)
					.data('aspectRatio', this.height / this.width)

					// and remove the hard coded width/height
					.removeAttr('height')
					.removeAttr('width');

			});

			// When the window is resized
			jQuery(window).resize(function () {

				var newWidth = $fluidEl.width();

				// Resize all videos according to their own aspect ratio
				$allVideos.each(function () {

					var $el = jQuery(this);
					$el
						.width(newWidth)
						.height(newWidth * $el.data('aspectRatio'));
				});

				// Kick off one resize to fix all videos on page load
			}).resize();

		}
	};
};
},{}],7:[function(require,module,exports){
var Nav = require('./components/nav.js');
var AnimatedSphereWireframe = require('./components/animated-sphere-wireframe.js');
var PhotoGrid = require('./components/photo-grid.js');
var Videos = require('./components/videos.js');
var Resume = require('./components/resume.js');
var Global = require('./components/global.js');
var Utilities = require('./utils.js');

(function () {
	
	$(document).ready(function() {

		PhotoGrid().init();
		Nav().init();
		Videos().init();
		Resume().init();
		Global().init();
		AnimatedSphereWireframe().init();
	
	});
	
})();
},{"./components/animated-sphere-wireframe.js":1,"./components/global.js":2,"./components/nav.js":3,"./components/photo-grid.js":4,"./components/resume.js":5,"./components/videos.js":6,"./utils.js":8}],8:[function(require,module,exports){
(function () {
	
	var appSettings;
	
	window.utils = (function() {
		
		return {
			appSettings: {
				mobileMax: 767,
				tabletMin: 768,
				tabletMax: 991,
				desktopMin: 992,
				desktopLargeMin: 1200,
				titleFadeInLength: 1800,
				menuFadeInDelay: 300
			},
			
			mobile: function() {
				return window.innerWidth < this.appSettings.tabletMin;
			},
			
			tablet: function() {
				return (window.innerWidth > this.appSettings.mobileMax && window.innerWidth < this.appSettings.desktopMin);
			},
			
			getBreakpoint: function() {
				if (window.innerWidth < this.appSettings.tabletMin) return 'mobile';
				else if (window.innerWidth < this.appSettings.desktopMin) return 'tablet';
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
				return utils.secondsToMilliseconds(parseFloat(getComputedStyle($element[0]).transitionDuration));
			},

			/**
			* Wraps all characters in an element with a specified element and class name. Useful for animations. Element type and class name parameters are optional. If you specify neither, characters will be wrapped with <span> tags.
			* Params:
			* 	-element: Element that contains the words you would like to wrap.
			* 	-elementType (optional): Type of element to wrap words with, i.e. div, span, p, etc.
			*	-className (optional): class to add to each wrapper element.
			*/
			wrapCharacters: function(element, elementType, className) {
				className = className || undefined;
				elementType = elementType || undefined;
				
				var el = $(element);
				var regExp;
								
				if (elementType === undefined) {
					regExp = '<span>$&</span>';
				}
				else if (className === undefined) {
					regExp = '<' + elementType + '>$&</' + elementType + '>';
				}
				else {
					regExp = '<' + elementType + ' class="' + className + '">$&</' + elementType + '>';
				}
				el.html(function(index, html) {
					return html.replace(/\S/g, regExp);
				});
			}
		};
	})();

	module.exports = window.utils;

})();
},{}]},{},[7]);
