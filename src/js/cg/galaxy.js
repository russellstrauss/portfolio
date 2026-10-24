import * as THREE from '@/js/vendors/three.js/build/three.module.js';
import * as graphics from '@/js/cg/graphics.js'; var gfx = graphics.default;
import * as Utils from '@/js/utils.js';import { Color, Vector2 } from 'three';
 let utils = Utils.default;


var galaxy = (function() {
	
	var settings = {
		defaultCameraLocation: {
			x: 500,
			y: 500,
			z: 500
		},
		colors: {
			worldColor: new THREE.Color('#000')
		},
		axes: {
			color: 0xffffff,
			count: 20,
			tickLength: 1
		},
		iOS: {
			particleSize: 8,
			starSize: 3
		},
		camera: {
			height: 500,
			orbitDegreesPerSecond: 0.18, // constant azimuth rate; never depends on position along the path
			maxRadius: 1700,
			minRadius: 1000,
			breathePeriodSeconds: 1800, // time for radius to go out -> in -> out
			maxFrameDelta: 0.1 // seconds; longer frames (hitches, hidden tab) are clamped so time never "catches up"
		}
		
	};
	
	var clusterGeometry, initialized = false, frameCount = 0;
	var renderer, scene, camera, controls;
	let interps = [d3.interpolateRainbow, d3.interpolateRgb('#450F66', '#B36002'), d3.interpolateRgb('white', 'red'), d3.interpolateSinebow, d3.interpolateYlOrRd, d3.interpolateYlGnBu,d3.interpolateRdPu, d3.interpolatePuBu, d3.interpolateGnBu, d3.interpolateBuPu, d3.interpolateCubehelixDefault, d3.interpolateCool, d3.interpolateWarm, d3.interpolateCividis, d3.interpolatePlasma, d3.interpolateMagma, d3.interpolateInferno, d3.interpolateViridis, d3.interpolateTurbo, d3.interpolatePurples, d3.interpolateReds, d3.interpolateOranges, d3.interpolateGreys, d3.interpolateGreens, d3.interpolateBlues, d3.interpolateSpectral, d3.interpolateRdYlBu, d3.interpolateRdBu, d3.interpolatePuOr, d3.interpolatePiYG, d3.interpolatePRGn];
	let elapsed = 0, clock, animationFrameId = null;
	let cameraFocalPoint = new THREE.Vector3(0, 0, 0), origin = new THREE.Vector3(0, 0, 0), particles, particleCount = 60000, particleSpread = 500, positions, trajectory_iteration_count = 40, trajectoryReverse = false;
	
	return {
		init: function() {
			this.begin();
		},
		
		begin: function() {
			// Only one render loop / canvas may ever exist (HMR or a remount would otherwise stack loops).
			if (typeof window !== 'undefined' && typeof window.__galaxyTeardown === 'function') window.__galaxyTeardown();

			elapsed = 0;

			scene = gfx.setUpScene();
			renderer = gfx.setUpRenderer(renderer);
			camera = gfx.setUpCamera(camera);
			scene.background = settings.colors.worldColor;
			const removeResizeListener = gfx.resizeRendererOnWindowResize(renderer, camera);
			gfx.setUpLights();
			gfx.setCameraLocation(camera, settings.defaultCameraLocation);
			clock = new THREE.Clock(); clock.start();
			this.addStars();
			this.firstFrame();
			
			var animate = () => {
				animationFrameId = requestAnimationFrame(animate);
				this.everyFrame();
				renderer.render(scene, camera);
			};
			animate();

			window.__galaxyTeardown = () => {
				cancelAnimationFrame(animationFrameId);
				animationFrameId = null;
				if (typeof removeResizeListener === 'function') removeResizeListener();
				if (renderer) {
					if (renderer.domElement && renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
					renderer.dispose();
				}
				window.__galaxyTeardown = null;
			};
		},
		
		firstFrame: function() {
			camera.lookAt(cameraFocalPoint);
		},
		
		everyFrame: function() {
			
			if (!initialized) this.firstFrame();
			this.updateCamera();
			this.updateParticles();
			frameCount++;
		},
		
		updateCamera: function() {
			const cam = settings.camera;
			// Clamp so a long frame never turns into a jump or a burst of speed.
			elapsed += Math.min(clock.getDelta(), cam.maxFrameDelta);

			const angle = THREE.MathUtils.degToRad(cam.orbitDegreesPerSecond) * elapsed;
			const mid = (cam.maxRadius + cam.minRadius) / 2;
			const amp = (cam.maxRadius - cam.minRadius) / 2;
			const radius = mid + amp * Math.cos(2 * Math.PI * elapsed / cam.breathePeriodSeconds);

			camera.position.set(radius * Math.cos(angle), cam.height, radius * Math.sin(angle));
			camera.lookAt(cameraFocalPoint);
		},
		
		addStars: function() {
			let geometry = new THREE.BufferGeometry();
			let vertices = [];
			for (let i = 0; i < 10000; i++) {
				vertices.push(THREE.MathUtils.randFloatSpread(4000)); vertices.push(THREE.MathUtils.randFloatSpread(4000)); vertices.push(THREE.MathUtils.randFloatSpread(4000));
			}
			
			let size = 1;
			if (utils.iOS() == true) size = settings.iOS.starSize;
			geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
			let stars = new THREE.Points(geometry, new THREE.PointsMaterial({ 
				color: 0x888888,
				size: size
			}));
			scene.add(stars);
		},
		
		addCluster: function() {
			
			clusterGeometry = new THREE.BufferGeometry();
			let vertices = [];
			for (let i = 0; i < particleCount; i += 3) {
				let min = -1000;
				let max =  1000;
				let spread = Math.random() * (max - min) + min;
				vertices.push(THREE.MathUtils.randFloatSpread(spread)); vertices.push(THREE.MathUtils.randFloatSpread(spread)); vertices.push(THREE.MathUtils.randFloatSpread(spread));
			}
			// et colors and positions
			clusterGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
			let colors = this.interpolateD3Colors(clusterGeometry, interps[5], false);
			clusterGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
			
			let size = 1;
			if (utils.iOS() == true) size = settings.iOS.particleSize;
			particles = new THREE.Points(clusterGeometry, new THREE.PointsMaterial({
				vertexColors: THREE.VertexColors,
				size: size
			}));
			scene.add(particles);
		},
		
		updateParticles: function() {
			if (clusterGeometry) {
				
				let pos = particles.geometry.attributes.position.array;
				
				for (let i = 0; i < particleCount; i+=3) {
					
					let position = new THREE.Vector3(pos[i + 0], pos[i + 1], pos[i + 2]);
					
					// define vector
					let scalar = .01;
					let forceX = -position.y * scalar;
					let forceY = -position.z * scalar;
					let forceZ = -position.x * scalar; // galaxy
					let force =  new THREE.Vector3(forceX, forceY, forceZ);
					
					let min = -500;
					let max = 4000;
					let maxDistance = 1000 + (Math.random() * (max - min) + min);
					if (position.distanceTo(origin) > maxDistance) pos[i] = THREE.MathUtils.randFloatSpread(1000), pos[i + 1] = THREE.MathUtils.randFloatSpread(1000), pos[i + 2] = THREE.MathUtils.randFloatSpread(1000);
					
					pos[i + 0] += forceX;
					pos[i + 1] += forceY;
					pos[i + 2] += forceZ;
				}
				particles.geometry.attributes.position.needsUpdate = true;
			}
		},
		
		interpolateD3Colors: function(geometry, interpolatorFunc, reverse) {
			
			reverse = reverse || false;
			let colors = [];
			
			for (let i = 0; i < particleCount; i += 3) {
				let interpolator = (i/(particleCount - 1));
				let color = this.rgbStringToColor(interpolatorFunc(interpolator));

				colors.push(color.r);
				colors.push(color.g);
				colors.push(color.b);
			}
			if (reverse === true) colors.reverse();
			return colors;
		},
		
		rgbStringToColor: function(rgbString) {
			rgbString = rgbString.replace('rgb(','').replace(')','').replace(' ','').split(',');
			return new THREE.Color(rgbString[0]/255, rgbString[1]/255, rgbString[2]/255);
		}
	}
})();

export default galaxy