<template>

	<div class="landing container-fluid">
		<Title></Title>
		<Nav></Nav>
		
		<iframe style="dispay: none; !important;" width="560" height="315" src="https://www.youtube-nocookie.com/embed/wE2GZ2Vpqjo?rel=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowfullscreen></iframe>
	</div>
</template>

<script>
	
	import Title from './components/Title.vue';
	import Nav from './components/Nav.vue';
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
		
		.name {
			
			a {
				@include ibm;
				@include mobile-only {	
					font-size: 28px;
				}
				color: white;
			}
		}
		
		.main a {
			@include ibm;
			color: white;
			
			&:hover {
				color: #2592BE;
			}
		}
		
		iframe {
			display: none;
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
	
	
</style>