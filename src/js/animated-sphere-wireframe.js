module.exports = function() {
	
	var settings;
		
	return {
		
		settings: {
			
		},
		
		init: function() {
			var scope = this;
			
			var titleFadeInLength = 1800; // match to timer in Nav.vue
			var menuFadeInDelay = 500; // match to timer in Nav.vue
			
			setTimeout(function() {
				$('#sphereWireframe').addClass('active');
				scope.triggerAnimation();
			}, titleFadeInLength + menuFadeInDelay + 1200);	
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