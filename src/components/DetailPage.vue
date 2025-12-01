<template>
	<div class="detail-page container-fluid">
		
		<Title></Title>
		<div class="layout-wrapper">
			<Nav></Nav>
			
			<div class="main-content">
				
				{{ $route.params.path }}
				{{ $route.params.id }}
				
				<h1>{{ details.title }}</h1>
				{{ details.description }}
				
			</div>
		</div>
		
		
		<!-- <div class="layout-wrapper">
			<div>
				<h1>{{ category.title }}</h1>
				<p>{{ category.description }}</p>
			</div>
		</div> -->
	</div>
</template>

<script>
	
	import Title from './Title.vue';
	import Nav from './Nav.vue';
	import axios from 'axios';
	
	export default {
		
		name: 'DetailPage',

		components: {
			Nav,
			Title
		},

		data() {
			return {
				details: {
					url: "",
					title: "",
					description: "",
					natureOfContributions: "",
					featuredImage: "",
					href: ""
				}
			};
		},

		methods: {},

		mounted: function () {
			let self = this;
			
			console.log(self.$route.params);
			
			let pieces = import.meta.env.BASE_URL + 'data/pieces.json';
			axios.get(pieces).then(function(response) {
				
				let categories = response.data.categories;
				let category = categories.filter(category => category.path === self.$route.params.path)[0];
				
				
				console.log(category);
				if (category) self.details = category.pieces.filter(details => details.internalURL === self.$route.params.id)[0];
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	};
</script>

<style lang="scss">

</style>