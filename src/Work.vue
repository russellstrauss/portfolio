<template>
	<div class="work">
		<transition-group class="category-list" name="stagger-list" tag="ul" appear v-on:enter="menuItemEnter" v-on:appear="menuItemEnter" v-on:leave="menuItemLeave">
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
			
			animateCategories: function() {
				// Remove active class from all categories first
				const categoryElements = this.$el.querySelectorAll('.category');
				categoryElements.forEach((element) => {
					element.classList.remove('active');
				});
				
				// Force a reflow to ensure the hidden state is applied
				void this.$el.offsetHeight;
				
				// Use requestAnimationFrame to ensure the browser has processed the CSS change
				requestAnimationFrame(() => {
					// Then re-trigger the enter animation
					categoryElements.forEach((element) => {
						const index = parseInt(element.dataset.index) || 0;
						const delay = index * 75;
						setTimeout(() => {
							element.classList.add('active');
						}, delay);
					});
				});
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
					// Ensure all elements start hidden after they're rendered, then animate in
					self.$nextTick(() => {
						const categoryElements = self.$el.querySelectorAll('.category');
						// First, explicitly remove active class to ensure hidden state
						categoryElements.forEach((element) => {
							element.classList.remove('active');
						});
						// Force a reflow to ensure the hidden state is applied
						void self.$el.offsetHeight;
						// Then trigger the enter animation
						categoryElements.forEach((element) => {
							const index = parseInt(element.dataset.index) || 0;
							const delay = index * 75;
							setTimeout(() => {
								element.classList.add('active');
							}, delay);
						});
					});
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			
			menuItemEnter: function (element, done) {
				if (!element || !element.dataset) return;
				// Ensure element starts hidden (remove active class if present)
				element.classList.remove('active');
				// Force reflow to ensure the hidden state is applied
				void element.offsetHeight;
				var delay = element.dataset.index * 75;
				setTimeout(function () {
					element.classList.add('active');
					if (done) done();
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
		
		beforeRouteUpdate: function(to, from, next) {
			// Immediately hide items when navigating back to /work
			if (to.path === '/work' && from.path && from.path.startsWith('/work/')) {
				if (this.$el) {
					const categoryElements = this.$el.querySelectorAll('.category');
					categoryElements.forEach((element) => {
						element.classList.remove('active');
					});
				}
			}
			next();
		},
		
		activated: function() {
			// This hook is called when a kept-alive component is activated
			// Immediately hide items first
			if (this.$el) {
				const categoryElements = this.$el.querySelectorAll('.category');
				categoryElements.forEach((element) => {
					element.classList.remove('active');
				});
			}
			// Then re-trigger the animation when navigating back to this page
			this.$nextTick(() => {
				// Wait for DOM to be ready
				requestAnimationFrame(() => {
					this.animateCategories();
				});
			});
		},
		
		watch: {
			'$route.path': function(newPath, oldPath) {
				// When navigating back to /work from a category page, re-animate
				if (newPath === '/work' && oldPath && oldPath.startsWith('/work/')) {
					// Immediately hide items first (synchronously)
					if (this.$el) {
						const categoryElements = this.$el.querySelectorAll('.category');
						categoryElements.forEach((element) => {
							element.classList.remove('active');
						});
					}
					// Then animate them in
					this.$nextTick(() => {
						// Wait for DOM to be ready
						requestAnimationFrame(() => {
							this.animateCategories();
						});
					});
				}
			}
		}
	}
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