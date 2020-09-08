<template>
	<div class="generic-page">
		
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
			
			let pieces = '/data/pieces.json';
			axios.get(pieces).then(function(response) {
				
				// let categories = response.data.categories;
				// let category = categories.filter(category => category.path === self.$route.params.path);
				
				
				// console.log(category);
				// self.details = category[0].pieces.filter(details => details.internalURL === self.$route.params.id)[0];
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	};
</script>

<style lang="scss">

</style>