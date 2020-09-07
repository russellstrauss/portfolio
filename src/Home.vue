<template>
	<div class="front-page">
		
		<Nav></Nav>
		
		<div id="sphereWireframe"></div>
	</div>
</template>

<script>
	
	import Nav from './components/Nav.vue';
	var AnimatedSphereWireframe = require('./js/animated-sphere-wireframe.js');
	
	export default {
		name: 'Home',

		components: {
			Nav
		},

		data() {
			return {};
		},

		methods: {
			
		},

		mounted: function () {
			
			AnimatedSphereWireframe().init();
			
			var fadeInWireframe = function () {
				$('#sphereWireframe').css('opacity', '1');
			};
		},
	};
</script>

<style lang="scss">

	
</style>