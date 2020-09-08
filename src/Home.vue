<template>
	<div class="landing">
		<Title></Title>
		<Nav></Nav>
		
		<div id="sphereWireframe"></div>
	</div>
</template>

<script>
	
	import Title from './components/Title.vue';
	import Nav from './components/Nav.vue';
	var AnimatedSphereWireframe = require('./js/animated-sphere-wireframe.js');
	
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
			
			AnimatedSphereWireframe().init();
		},
	};
</script>

<style lang="scss">
	
</style>