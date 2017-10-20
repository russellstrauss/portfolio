(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function() {
	
	var settings;
	
	return {
		
		settings: {
			
		},
		
		init: function() {
			
			settings = this.settings;
			
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
			//var bgColor = 0xf0f0f0;
			var bgColor = 0xffffff;
			var nodeVisibilityMargin = 10;//50;
			var count = 0;
			var backgroundNodeScale = .6;
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
				camera.position.z = 400;
				camera.position.y = -60;
				camera.position.x = -60;

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
			function onDocumentMouseMove(event) 
			{
				// event.preventDefault();
				// mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
				// mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
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
			
			// Animate name in
			var $name = $('.name a span span');
			var $parent = $('.name');
			//$parent.css('min-width', '1000px');
			
			$name.each(function(i) {
				
				var $letter = $(this);
				var fadeInInterval = 100;
				
				setTimeout(function(){
					$letter.css({'margin-left': '0', 'opacity': '1', 'transform': 'rotate(0deg)'});
				}, i*fadeInInterval);
				
				setTimeout(function() {
					//$parent.css('min-width', '');
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
},{}],4:[function(require,module,exports){
var Component = require('./components/component.js');
var Menu = require('./components/menu.js');
var AnimatedSphereWireframe = require('./components/animated-sphere-wireframe.js')
var Utilities = require('./utils.js');

(function () {
	
	$(document).ready(function() {
				
		Component().init();
		Menu().init();
		
		if ($('#sphereWireframe').length > 0) {
			AnimatedSphereWireframe().init();
		}
		
		$(window).trigger('resize');
	
	});
	
})();
},{"./components/animated-sphere-wireframe.js":1,"./components/component.js":2,"./components/menu.js":3,"./utils.js":5}],5:[function(require,module,exports){
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
			
			isOnScreen: function(element) {

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
			
			getBreakpoint: function() {
				if (window.innerWidth < appSettings.tabletMin) return 'mobile';
				else if (window.innerWidth < appSettings.desktopMin) return 'tablet';
				else return 'desktop';
			},
			
			secondsToMilliseconds: function(seconds) {
				return seconds * 1000;
			}
		}
	})();

	module.exports = window.utils;

})();
},{}]},{},[4]);
