import * as THREE from '@/js/vendors/three.js/build/three.module.js';
import * as graphics from '@/js/cg/graphics.js'; var gfx = graphics.default;
import * as Utils from '@/js/utils.js';
import { advanceOrbitAngle, orbitPosition } from '@/js/cg/orbitCamera.js';
let utils = Utils.default;

// Identifies the animation loop that is allowed to move the camera. A second
// init (or a hot reload) replaces the token so the previous loop stops instead
// of stacking and multiplying the rotation.
const GALAXY_LOOP = '__portfolioGalaxyLoop';

var galaxy = (function() {
	
	var settings = {
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
		}
		
	};
	
	var clusterGeometry, frameCount = 0;
	var renderer, scene, camera;
	let interps = [d3.interpolateRainbow, d3.interpolateRgb('#450F66', '#B36002'), d3.interpolateRgb('white', 'red'), d3.interpolateSinebow, d3.interpolateYlOrRd, d3.interpolateYlGnBu,d3.interpolateRdPu, d3.interpolatePuBu, d3.interpolateGnBu, d3.interpolateBuPu, d3.interpolateCubehelixDefault, d3.interpolateCool, d3.interpolateWarm, d3.interpolateCividis, d3.interpolatePlasma, d3.interpolateMagma, d3.interpolateInferno, d3.interpolateViridis, d3.interpolateTurbo, d3.interpolatePurples, d3.interpolateReds, d3.interpolateOranges, d3.interpolateGreys, d3.interpolateGreens, d3.interpolateBlues, d3.interpolateSpectral, d3.interpolateRdYlBu, d3.interpolateRdBu, d3.interpolatePuOr, d3.interpolatePiYG, d3.interpolatePRGn];
	let cameraFocalPoint = new THREE.Vector3(0, 0, 0), origin = new THREE.Vector3(0, 0, 0), particles, particleCount = 60000, particleSpread = 500, positions;
	let orbitAngle = 0;
	let lastFrameMs = null;
	let reducedMotionQuery = null;
	let running = false;

	function motionEnabled() {
		if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return true;
		if (!reducedMotionQuery) reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		return !reducedMotionQuery.matches;
	}
	
	return {
		init: function() {
			if (running) return;
			running = true;
			this.begin();
		},
		
		begin: function() {
			const loopToken = Symbol();
			if (typeof window !== 'undefined') window[GALAXY_LOOP] = loopToken;
			if (typeof document !== 'undefined') {
				document.querySelectorAll('canvas[data-galaxy-background]').forEach((el) => el.remove());
			}

			orbitAngle = 0;
			lastFrameMs = null;

			scene = gfx.setUpScene();
			renderer = gfx.setUpRenderer(renderer);
			renderer.domElement.dataset.galaxyBackground = 'true';
			camera = gfx.setUpCamera(camera);
			scene.background = settings.colors.worldColor;
			gfx.resizeRendererOnWindowResize(renderer, camera);
			gfx.setUpLights();
			this.addStars();
			//this.addCluster();
			this.placeCamera(orbitAngle);
			renderer.render(scene, camera);
			
			const animate = (now) => {
				if (typeof window !== 'undefined' && window[GALAXY_LOOP] !== loopToken) return;
				requestAnimationFrame(animate);
				this.everyFrame(now);
				renderer.render(scene, camera);
			};
			requestAnimationFrame(animate);
		},
		
		everyFrame: function(now) {
			this.updateCamera(now);
			this.updateParticles();
			frameCount++;
		},

		placeCamera: function(angle) {
			const position = orbitPosition(angle);
			camera.position.set(position.x, position.y, position.z);
			camera.lookAt(cameraFocalPoint);
		},
		
		updateCamera: function(now) {
			if (typeof now !== 'number') return;
			// First timestamp only establishes a baseline. Applying it would
			// treat "time since navigation start" as a single frame step.
			if (lastFrameMs === null) {
				lastFrameMs = now;
				this.placeCamera(orbitAngle);
				return;
			}
			const dt = (now - lastFrameMs) / 1000;
			lastFrameMs = now;
			orbitAngle = advanceOrbitAngle(orbitAngle, dt, { motionEnabled: motionEnabled() });
			this.placeCamera(orbitAngle);
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