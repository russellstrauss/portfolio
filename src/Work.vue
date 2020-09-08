<template>
	<div class="work">
		
		<Title></Title>
		
		<div class="layout-wrapper">
			<Nav></Nav>
			<ul>
				<li v-for="category in categories" :key="category.path" class="category">
					<a :href="$route.path + '/' + category.path">{{ category.title }}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	
	import axios from 'axios';
	import Title from './components/Title.vue';
	import Nav from './components/Nav.vue';
	
	export default {
		name: 'Work',

		components: {
			Nav,
			Title
		},

		data() {
			return {
				categories: []
			};
		},

		methods: {},

		mounted: function () {
			
			console.log(this.$route.path);
			
			let self = this;
			let categories = '/data/categories.json';
			axios.get(categories).then(function(response) {
				
				let categories = response.data.categories;
				if (categories) categories.sort(function(a, b) {
					return a.sortOrder - b.sortOrder;
				});
				self.categories = response.data.categories;
			})
			.catch(function (error) {
				console.log(error);
			});
			
			// $('#category-container').find('.portfolio-category').each(function(i) {
			// 	var $menuItem = $(this);
				
			// 	setTimeout(function() {
			// 		$menuItem.css({'margin-left': '0', 'opacity': 1});
			// 	}, i * 75);
			// });
			
		},
	};
</script>

<style lang="scss">

	.category {
		@include headingFont;
		margin-bottom: 20px;
		margin-left: 30px;
		// opacity: 0;
		transition: opacity 600ms ease, margin-left 400ms ease;
	}
</style>