<template>
	<div class="work container-fluid">
		
		<Title></Title>
		
		<div class="layout-wrapper">
			<Nav></Nav>
			
			<ul class="category-list">
				<li v-for="category in categories" :key="category.path" class="category">
					<a :href="$route.path + '/' + category.path">{{ category.title }}</a>
				</li>
			</ul>
			
			
		</div>
		<!-- <ul class="staggering-start-value">
			<li class="el"></li>
			<li class="el"></li>
			<li class="el"></li>
			<li class="el"></li>
			<li class="el"></li>
			<li class="el"></li>
			<li class="el"></li>
			<li class="el"></li>
			<li class="el"></li>
			<li class="el"></li>
			<li class="el"></li>
			<li class="el"></li>
		</ul> -->
	</div>
</template>

<script>
	import axios from 'axios';
	import anime from 'animejs';
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
			
			let self = this;
			let categories = '/data/categories.json';
			axios.get(categories).then(function(response) {
				
				let categories = response.data.categories;
				if (categories) categories.sort(function(a, b) {
					return a.sortOrder - b.sortOrder;
				});
				self.categories = response.data.categories.filter(category => category.published === "true");
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
			
			// anime({
			// 	targets: '.category-list .category',
			// 	translateX: 500,
			// 	delay: anime.stagger(100, {start: 1500}) // delay starts at 500ms then increase by 100ms for each elements.
			// });
			
			// anime({
			// 	targets: '.staggering-start-value .el',
			// 	translateX: 100,
			// 	delay: anime.stagger(0, {start: 1500}) // delay starts at 500ms then increase by 100ms for each elements.
			// });
			
		},
	};
</script>

<style lang="scss">
	
	.category-list {
		
		.category {
			@include heading-font;
			margin-bottom: 20px;
			// opacity: 0;
			transition: opacity 600ms ease, margin-left 400ms ease;
			
			a {
				text-decoration: none;
			}
		}
	}
	
	.staggering-start-value {
		display: block;
		
		.el {
			width: 10px;
			height: 10px;
			display: block;
			background-color: green;
			margin: 5px;
			// transform: translateX(600px)
		}
	}
</style>