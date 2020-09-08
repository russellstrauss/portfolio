<template>
	<div class="category-detail">
		
		<Title></Title>
		
		<div class="layout-wrapper">
			<Nav></Nav>
			<div>
				<h1>{{ category.title }}</h1>
				<p>{{ category.description }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	
	import axios from 'axios';
	import Title from './Title.vue';
	import Nav from './Nav.vue';
	
	export default {
		
		name: 'CategoryDetail',

		components: {
			Nav,
			Title
		},

		data() {
			return {
				category: {}
			};
		},

		methods: {},

		mounted: function () {
			
			let self = this;
			let categories = '/data/categories.json';
			axios.get(categories).then(function(response) {
				
				let categories = response.data.categories;
				self.category = categories.filter(category => category.path === self.$route.params.path)[0];
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	};
</script>

<style lang="scss">

</style>