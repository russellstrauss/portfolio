<template>
	<div class="work">
		<transition-group class="category-list" name="stagger-list" tag="ul" appear v-on:enter="menuItemEnter" v-on:leave="menuItemLeave">
			<li class="category" v-for="(category, index) in categories" :key="category.path" :data-index="index">
				<a :href="$route.path + '/' + category.path" @click.prevent="navigateToCategory(category.path)">{{ category.title }}</a>
			</li>
		</transition-group>
	</div>
</template>

<script>
	import axios from 'axios';
	import anime from 'animejs';
	
	export default {
		name: 'Work',

		data() {
			return {
				categories: []
			};
		},

		methods: {
			
			navigateToCategory: function(categoryPath) {
				if (this.$router) {
					this.$router.push('/work/' + categoryPath);
				}
			},
			
			loadCategories: function() {
				let self = this;
				let categoriesUrl = '/data/categories.json';

				axios.get(categoriesUrl).then(function(response) {
					
					let categories = response.data.categories;
					if (categories) categories.sort(function(a, b) {
						return a.sortOrder - b.sortOrder;
					});
					self.categories = response.data.categories.filter(category => category.published === "true");
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			
			menuItemEnter: function (element) {
				if (!element || !element.dataset) return;
				var delay = element.dataset.index * 75;
				setTimeout(function () {
					element.classList.add('active');
				}, delay);
			},
			menuItemLeave: function (element) {
				if (!element || !element.dataset) return;
				var delay = element.dataset.index * 75;
				setTimeout(function () {
					element.classList.remove('active');
				}, delay);
			}
		},

		mounted: function () {
			this.loadCategories();
		},
		
		// Keep-alive: let cached data persist to avoid flicker on back nav
	};
</script>

<style lang="scss">
	@use '@/sass/responsive' as *;
	
	.category-list {
		
		.category {
			@include heading-font;
			margin-bottom: 20px;
			opacity: 0;
			margin-left: 20px;
			transition: opacity 600ms ease, margin-left 400ms ease;
			list-style-type: none;

			
			&.active {
				opacity: 1;
				margin-left: 0;
			}

			
			a {
				text-decoration: none;
				
				&:hover {
					color: $hover-color;
				}
			}
		}
	}
</style>