<template>
	<div class="work">
		<transition-group class="category-list" name="stagger-list" tag="ul" v-on:enter="menuItemEnter" v-on:leave="menuItemLeave">
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
				if (!this.$el) return;
				
				const categoryElements = this.$el.querySelectorAll('.category');
				
				// Force opacity: 0 using inline styles (overrides CSS)
				categoryElements.forEach((element) => {
					element.classList.remove('active');
					element.style.opacity = '0';
					element.style.marginLeft = '20px';
				});
				
				// Force a reflow to ensure the hidden state is applied
				void this.$el.offsetHeight;
				
				// Use requestAnimationFrame to ensure the browser has processed the CSS change
				requestAnimationFrame(() => {
					// Double-check items are still hidden
					categoryElements.forEach((element) => {
						element.classList.remove('active');
						element.style.opacity = '0';
						element.style.marginLeft = '20px';
					});
					void this.$el.offsetHeight;
					// Wait one more frame to ensure hidden state is painted
					requestAnimationFrame(() => {
						// Remove inline styles and let CSS handle the animation
						categoryElements.forEach((element) => {
							element.style.opacity = '';
							element.style.marginLeft = '';
						});
						// Then re-trigger the enter animation
						categoryElements.forEach((element) => {
							const index = parseInt(element.dataset.index) || 0;
							const delay = index * 75;
							setTimeout(() => {
								element.classList.add('active');
							}, delay);
						});
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
						// Force opacity: 0 using inline styles (overrides CSS)
						categoryElements.forEach((element) => {
							element.classList.remove('active');
							element.style.opacity = '0';
							element.style.marginLeft = '20px';
						});
						// Force a reflow to ensure the hidden state is applied
						void self.$el.offsetHeight;
						// Wait one more frame to ensure hidden state is painted
						requestAnimationFrame(() => {
							// Remove inline styles and let CSS handle the animation
							categoryElements.forEach((element) => {
								element.style.opacity = '';
								element.style.marginLeft = '';
							});
							// Then trigger the enter animation
							categoryElements.forEach((element) => {
								const index = parseInt(element.dataset.index) || 0;
								const delay = index * 75;
								setTimeout(() => {
									element.classList.add('active');
								}, delay);
							});
						});
					});
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			
			menuItemEnter: function (element, done) {
				if (!element || !element.dataset) return;
				// Ensure element starts hidden using inline styles (overrides CSS)
				element.classList.remove('active');
				element.style.opacity = '0';
				element.style.marginLeft = '20px';
				// Force reflow to ensure the hidden state is applied
				void element.offsetHeight;
				var delay = element.dataset.index * 75;
				setTimeout(function () {
					// Remove inline styles and let CSS handle the animation
					element.style.opacity = '';
					element.style.marginLeft = '';
					element.classList.add('active');
					if (done) done();
				}, delay);
			},
			menuItemLeave: function (element) {
				if (!element || !element.dataset) return;
				var delay = element.dataset.index * 75;
				setTimeout(function () {
					element.classList.remove('active');
					// Force opacity: 0 using inline styles to ensure hidden state
					element.style.opacity = '0';
					element.style.marginLeft = '20px';
				}, delay);
			}
		},

		beforeRouteEnter: function(to, from, next) {
			// This runs before the component is created
			// We can't access this.$el here, but we can ensure items are hidden after mount
			next();
		},

		beforeRouteLeave: function(to, from, next) {
			// Hide items when leaving /work page so they're hidden when returning
			if (from.path === '/work') {
				if (this.$el) {
					const categoryElements = this.$el.querySelectorAll('.category');
					categoryElements.forEach((element) => {
						element.classList.remove('active');
						element.style.opacity = '0';
						element.style.marginLeft = '20px';
					});
					// Force reflow to ensure hidden state is applied
					void this.$el.offsetHeight;
				}
			}
			next();
		},

		beforeRouteUpdate: function(to, from, next) {
			// Immediately hide items when navigating to /work from any route
			// This runs BEFORE the component updates, so we can hide items synchronously
			if (to.path === '/work') {
				if (this.$el) {
					const categoryElements = this.$el.querySelectorAll('.category');
					categoryElements.forEach((element) => {
						element.classList.remove('active');
						element.style.opacity = '0';
						element.style.marginLeft = '20px';
					});
					// Force reflow to ensure hidden state is applied before component updates
					void this.$el.offsetHeight;
				}
			}
			next();
		},

		mounted: function () {
			this.loadCategories();
		},
		
		deactivated: function() {
			// This hook is called when a kept-alive component is deactivated
			// Hide items when component is deactivated so they're hidden when reactivated
			if (this.$el) {
				const categoryElements = this.$el.querySelectorAll('.category');
				categoryElements.forEach((element) => {
					element.classList.remove('active');
					element.style.opacity = '0';
					element.style.marginLeft = '20px';
				});
				// Force reflow to ensure hidden state is applied
				void this.$el.offsetHeight;
			}
		},

		activated: function() {
			// This hook is called when a kept-alive component is activated
			// Immediately hide items first (synchronously) using inline styles
			if (this.$el) {
				const categoryElements = this.$el.querySelectorAll('.category');
				categoryElements.forEach((element) => {
					element.classList.remove('active');
					element.style.opacity = '0';
					element.style.marginLeft = '20px';
				});
				// Force reflow to ensure hidden state is applied
				void this.$el.offsetHeight;
			}
			// Then re-trigger the animation when navigating back to this page
			this.$nextTick(() => {
				// Wait for DOM to be ready, then ensure items are still hidden
				if (this.$el) {
					const categoryElements = this.$el.querySelectorAll('.category');
					categoryElements.forEach((element) => {
						element.classList.remove('active');
						element.style.opacity = '0';
						element.style.marginLeft = '20px';
					});
					void this.$el.offsetHeight;
				}
				// Wait one more frame to ensure hidden state is painted
				requestAnimationFrame(() => {
					this.animateCategories();
				});
			});
		},
		
		watch: {
			'$route.path': function(newPath, oldPath) {
				// When leaving /work page, hide items so they're hidden when returning
				if (oldPath === '/work' && newPath !== '/work') {
					if (this.$el) {
						const categoryElements = this.$el.querySelectorAll('.category');
						categoryElements.forEach((element) => {
							element.classList.remove('active');
							element.style.opacity = '0';
							element.style.marginLeft = '20px';
						});
						// Force reflow to ensure hidden state is applied
						void this.$el.offsetHeight;
					}
				}
				// When navigating to /work from any page, ensure items are hidden and re-animate
				if (newPath === '/work') {
					// Use nextTick to ensure DOM is ready, then hide items synchronously
					this.$nextTick(() => {
						// Immediately hide items first (synchronously) using inline styles
						if (this.$el) {
							const categoryElements = this.$el.querySelectorAll('.category');
							categoryElements.forEach((element) => {
								element.classList.remove('active');
								element.style.opacity = '0';
								element.style.marginLeft = '20px';
							});
							// Force reflow to ensure hidden state is applied
							void this.$el.offsetHeight;
						}
						// Wait one more frame to ensure hidden state is painted
						requestAnimationFrame(() => {
							this.animateCategories();
						});
					});
				}
			},
			'categories': function(newCategories, oldCategories) {
				// When categories are loaded/updated, ensure items are hidden before animating
				if (newCategories && newCategories.length > 0) {
					this.$nextTick(() => {
						if (this.$el) {
							const categoryElements = this.$el.querySelectorAll('.category');
							categoryElements.forEach((element) => {
								element.classList.remove('active');
							});
							// Force reflow
							void this.$el.offsetHeight;
						}
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