<template>
	<div class="missing-page container-fluid">
		
		<Title></Title>
		<div class="layout-wrapper">
			<Nav></Nav>
			
			<div class="main-content">
				<h1>Missing Page</h1>
				
			</div>
		</div>
	</div>
</template>

<script>
	
	import Title from './Title.vue';
	import Nav from './Nav.vue';
	import axios from 'axios';
	
	export default {
		
		name: 'Missing',

		components: {
			Nav,
			Title
		},

		data() {
			return {
				details: {}
			};
		},

		methods: {},

		mounted: function () {
			
			let self = this;
			
			console.log(self.$route.params);
		}
	};
</script>

<style lang="scss">

</style>