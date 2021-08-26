<template>

	<div class="landing container-fluid">
		<Title></Title>
		<Nav></Nav>
		
		<div id="sphereWireframe"></div>
	</div>
</template>

<script>
	
	import Title from './components/Title.vue';
	import Nav from './components/Nav.vue';
	// var AnimatedSphereWireframe = require('./js/animated-sphere-wireframe.js');
	
	import * as gfx from '@/js/cg/graphics.js';
	import * as Galaxy from '@/js/cg/galaxy.js';
	
	export default {
		name: 'Home',

		components: {
			Nav,
			Title
		},

		data() {
			return {};
		},

		methods: {},

		mounted: function () {
			
			Galaxy.default.init();
		}
	};
</script>

<style lang="scss">
	
	.landing {
		.name a {
			@include ibm;
			color: white;
		}
	}
	
	canvas {
		position: fixed;
		width: 100%;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: -9000;
	}
	
	.main a {
		@include ibm;
		color: white;
	}
	
</style>