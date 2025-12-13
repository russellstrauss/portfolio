<template>
	<Layout>
		<div class="main-content">
			<div class="category-detail category-content" :class="category.path">
					<PageTitle v-if="category.title" :title="category.title"></PageTitle>
					<div class="category-description" v-if="category.description">
						<p>{{ category.description }}</p>
					</div>
					
				<transition-group v-if="allPiecesLackFeaturedImages" :class="'category-list'" name="stagger-list" tag="ul" appear :key="category.path" v-on:enter="menuItemEnter" v-on:leave="menuItemLeave">
					<li v-for="(piece, index) in pieces" :key="piece.sortOrder" class="category" :data-index="index">
						<a :href="piece.href" :target="JSON.parse(piece.openInNewTab) ? '_blank' : '_self'" @click="handleLinkClick($event, piece.href, piece.openInNewTab)">{{ piece.title }}</a>
					</li>
				</transition-group>
				<transition-group v-else :class="viewType" name="stagger-grid" tag="ul" appear :key="category.path" v-on:enter="gridItemEnter" v-on:appear="gridItemEnter" v-on:leave="gridItemLeave">
					<li v-for="(piece, index) in pieces" :key="piece.sortOrder" class="each-piece" :style="'background-image: url(' + piece.featuredImage + ');'" :data-index="index">
						<a :href="piece.href" :target="JSON.parse(piece.openInNewTab) ? '_blank' : '_self'" @click="handleLinkClick($event, piece.href, piece.openInNewTab)">
							<div class="piece-details">
								<div class="row">
									<h2><span>{{ piece.title }}</span></h2>
									<div class="year" v-if="piece.year">{{piece.year}}</div>
								</div>
								<div class="text-block" v-if="piece.description !== ''">
									<p class="description">{{ piece.description }}</p>
									<p class="nature-of-contributions" v-if="piece.natureOfContributions">Nature of contributions: {{ piece.natureOfContributions }}</p>
								</div>
							</div>
						</a>
					</li>
				</transition-group>
			</div>
		</div>
	</Layout>
</template>

<script>
	
	import axios from 'axios';
	import piecesData from '@/data/pieces.js';
	import Layout from './Layout.vue';
	import PageTitle from './PageTitle.vue';
	
	export default {
		
		name: 'CategoryDetail',

		components: {
			Layout,
			PageTitle
		},

		data() {
			return {
				category: {},
				pieces: [],
				viewType: 'grid', // grid or list
				lastCategoryPath: null
			};
		},

		computed: {
			allPiecesLackFeaturedImages: function() {
				if (!this.pieces || this.pieces.length === 0) return false;
				return this.pieces.every(piece => !piece.featuredImage || piece.featuredImage === '' || piece.featuredImage === null || piece.featuredImage === undefined);
			}
		},

		methods: {

			handleLinkClick: function(event, href, openInNewTab) {
				// If the link should open in a new tab, let the browser handle it
				// The target="_blank" attribute will be respected
				if (openInNewTab === "true") {
					return; // Allow default behavior (opens in new tab)
				}

				// Check if it's an external URL (starts with http:// or https://)
				if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
					return; // Allow default behavior for external links
				}

				// Define known Vue routes - all routes starting with these should use router
				const vueRoutes = ['/', '/work', '/about', '/resume'];
				const isVueRoute = vueRoutes.some(route => href === route || href.startsWith(route + '/'));

				// If it's a Vue route, use router navigation to preserve app state
				if (href && isVueRoute && this.$router) {
					event.preventDefault();
					this.$router.push(href);
					return;
				}

				// If it's not a Vue route (or is external), force full page navigation
				// This allows static files in public/ to be served directly by Vite
				if (href && !isVueRoute) {
					event.preventDefault();
					window.location.href = href;
				}
			},

			getCategories: function() {

				return axios.get('/data/categories.json');
			},

			loadCategoryData: function() {
				const self = this;
				const currentCategory = this.$route.params.category;

				this.lastCategoryPath = currentCategory;

				// Use imported pieces data instead of axios for pieces
				this.getCategories()
					.then(function (categoriesResponse) {
						const categories = categoriesResponse.data;
						
						const categoryResponse = categories.categories.filter(category => category.path === currentCategory)[0];
						if (categoryResponse) self.category = categoryResponse;
						
						// Use imported pieces data
						const piecesResponse = piecesData.categories.filter(category => category.path === currentCategory)[0];
						if (piecesResponse) self.pieces = piecesResponse.pieces.filter(piece => piece.published === "true");
						
						// Ensure all elements start hidden after they're rendered, then animate in
						self.$nextTick(() => {
							if (self.allPiecesLackFeaturedImages) {
								const categoryElements = self.$el.querySelectorAll('.category');
								categoryElements.forEach((element) => {
									element.classList.remove('active');
									element.style.opacity = '0';
									element.style.marginLeft = '20px';
								});
								void self.$el.offsetHeight;
								requestAnimationFrame(() => {
									categoryElements.forEach((element) => {
										element.style.opacity = '';
										element.style.marginLeft = '';
									});
									categoryElements.forEach((element) => {
										const index = parseInt(element.dataset.index) || 0;
										const delay = index * 75;
										setTimeout(() => {
											element.classList.add('active');
										}, delay);
									});
								});
							} else {
								const gridElements = self.$el.querySelectorAll('.each-piece');
								gridElements.forEach((element) => {
									element.classList.remove('active');
								});
								void self.$el.offsetHeight;
								gridElements.forEach((element) => {
									const index = parseInt(element.dataset.index) || 0;
									const delay = index * 75;
									setTimeout(() => {
										element.classList.add('active');
									}, delay);
								});
							}
						});
					})
					.catch(function (error) {
						console.log(error);
					});
			},

			animateGridItems: function() {
				if (this.allPiecesLackFeaturedImages) {
					const categoryElements = this.$el.querySelectorAll('.category');
					categoryElements.forEach((element) => {
						element.classList.remove('active');
						element.style.opacity = '0';
						element.style.marginLeft = '20px';
					});
					void this.$el.offsetHeight;
					requestAnimationFrame(() => {
						categoryElements.forEach((element) => {
							element.style.opacity = '';
							element.style.marginLeft = '';
						});
						categoryElements.forEach((element) => {
							const index = parseInt(element.dataset.index) || 0;
							const delay = index * 75;
							setTimeout(() => {
								element.classList.add('active');
							}, delay);
						});
					});
				} else {
					const gridElements = this.$el.querySelectorAll('.each-piece');
					gridElements.forEach((element) => {
						element.classList.remove('active');
					});
					void this.$el.offsetHeight;
					requestAnimationFrame(() => {
						gridElements.forEach((element) => {
							const index = parseInt(element.dataset.index) || 0;
							const delay = index * 75;
							setTimeout(() => {
								element.classList.add('active');
							}, delay);
						});
					});
				}
			},

			gridItemEnter: function (element, done) {
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

			gridItemLeave: function (element) {
				if (!element || !element.dataset) return;
				var delay = element.dataset.index * 75;
				setTimeout(function () {
					element.classList.remove('active');
				}, delay);
			},

			menuItemEnter: function (element, done) {
				if (!element || !element.dataset) return;
				element.classList.remove('active');
				element.style.opacity = '0';
				element.style.marginLeft = '20px';
				void element.offsetHeight;
				var delay = element.dataset.index * 75;
				setTimeout(function () {
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
					element.style.opacity = '0';
					element.style.marginLeft = '20px';
				}, delay);
			}

		},

		beforeRouteUpdate: function(to, from, next) {
			// Immediately hide items when navigating to a different category
			if (to.params.category !== from.params.category) {
				if (this.$el) {
					const gridElements = this.$el.querySelectorAll('.each-piece, .category');
					gridElements.forEach((element) => {
						element.classList.remove('active');
					});
				}
			}
			next();
		},

		mounted: function () {
			this.loadCategoryData();
		},

		activated: function() {
			// This hook is called when a kept-alive component is activated
			// Immediately hide items first
			if (this.$el) {
				const gridElements = this.$el.querySelectorAll('.each-piece, .category');
				gridElements.forEach((element) => {
					element.classList.remove('active');
				});
			}
			// Then re-trigger the animation when navigating back to this page
			this.$nextTick(() => {
				// Wait for DOM to be ready
				requestAnimationFrame(() => {
					this.animateGridItems();
				});
			});
		},

		watch: {
			'$route.params.category': function(newCategory, oldCategory) {
				// Only reload if it's actually a different category
				if (newCategory !== oldCategory) {
					// Immediately hide items first (synchronously)
					if (this.$el) {
						const gridElements = this.$el.querySelectorAll('.each-piece, .category');
						gridElements.forEach((element) => {
							element.classList.remove('active');
						});
					}
					// Then load new data
					this.loadCategoryData();
				} else if (newCategory === oldCategory) {
					// Same category, just re-animate (e.g., navigating back)
					// Immediately hide items first (synchronously)
					if (this.$el) {
						const gridElements = this.$el.querySelectorAll('.each-piece, .category');
						gridElements.forEach((element) => {
							element.classList.remove('active');
						});
					}
					// Then animate them in
					this.$nextTick(() => {
						// Wait for DOM to be ready
						requestAnimationFrame(() => {
							this.animateGridItems();
						});
					});
				}
			}
		}
	};
</script>

<style lang="scss">
	@use '@/sass/vars' as *;
	@use '@/sass/responsive' as *;
	@use '@/sass/mixins' as *;

	.category-detail.category-content {
		
		&.web-application-development {
			ul.grid .each-piece { // allow some extra mobile space for cool overlap effect on long content
				@include mobile-only {
					margin-bottom: 200px;
				}
			}
		}
		
		.category-description {
			margin-bottom: 50px;
		}
		
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
		
		ul {
			list-style-type: none;
			padding-left: 0;
			
			&.grid {
					
				@include desktop {
					display: flex;
					flex-wrap: wrap;
				}
				
				@include desktop-large {
					display: flex;
					flex-wrap: wrap;
				}
				
				.each-piece {
					@include square-shadow(rgba(255, 255, 255, .5));
					border: 1px solid rgba(255, 255, 255, .5);
					list-style-type: none;
					background-size: cover;
					background-position: center center;
					position: relative;
					margin-left: 0;
					margin-bottom: 30px;
					opacity: 0;
					transform: translate(0, 20px);
					transition: opacity 400ms $ease-out-quadratic, transform 300ms $ease-out-quadratic, box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
					
					@include small-screen {
						margin-bottom: 100px;
					}
					
					@include desktop {
						@include grid(2, 40);
					}
					
					@include desktop-large {
						@include grid(2, 100);
					}
					
					&.active {
						opacity: 1;
						transform: none;
					}
					
					&:hover {
						border: 1px solid white;
						
						.piece-details {
							@include square-shadow(white);
							.row h2 span {
								@include square-shadow(white);
							}
							.text-block {
								@include square-shadow(white);
							}
						}
					}
					
					&:before {
						content: "";
						display: block;
						padding-top: 100%;
					}
					
					a {
						color: black;
					}
					
					.featured-image {
						width: 100%;
						margin: 0;
					}
					
					.piece-details {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						padding: 20px;
						
						@include tablet-only {
							font-size: 0.875em;
							padding: 15px;
						}
						
						.row {
							display: flex;
							justify-content: space-between;
							align-items: flex-start;
							margin-bottom: 15px;
							
							h2 {
								color: black;
								font-size: 22px;
								
								span {
									@include square-shadow;
									background-color: white;
									border: 1px solid black;
									padding: 5px 10px;
									line-height: 2;
									
									@include tablet-only {
										padding: 4px 8px;
									}
								}
							}
							
							.year {
								@include square-shadow;
								background-color: white;
								border: 1px solid black;
								font-size: 18px;
								
								@include tablet-only {
									font-size: 16px;
									height: 40px;
								}
								
								height: 44px;
								display: flex;
								justify-content: center;
								flex-direction: column;
								padding: 0 10px;
								margin-left: 10px;
							}
						}
						
						.text-block {
							@include square-shadow;
							background-color: rgba(white, .85);
							border: 1px solid black;
							display: inline-block;
							
							@include mobile-only {
								background-color: rgba(white, .9);
								padding: 10px;
								margin-bottom: 20px;
							}
							
							@include tablet-only {
								padding: 15px;
								font-size: 0.9em;
							}
							
							@include desktop {
								padding: 20px;
							}
							
							*:last-child {
								margin-bottom: 0;
							}
						}
					}
				}
			}
				
			&.list {
				.each-piece {
					transition: all 0.3s cubic-bezier(.25,.8,.25,1);
					box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
					margin-bottom: 30px;
					
					opacity: 0;
					transform: translate(0, 20px);
					transition: opacity 400ms $ease-out-quadratic, transform 300ms $ease-out-quadratic;
					
					&.active {
						opacity: 1;
						transform: none;
					}

					@include mobile-only {
						margin-bottom: 100px;
					}

					@include desktop {
						display: flex;
					}
					
					&:hover {
						box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
					}
					
					.featured-image {
						max-width: 500px;
						margin-right: 20px;
						
						@include mobile-only {
							margin-right: 0;
							max-width: 100%;
						}
						
						img {
							border: 1px solid black;
							margin-right: 20px;
							height: auto;
							
							@include mobile-only {
								margin-bottom: 10px;
							}
			
							@include desktop {
								max-width: 500px;
							}
						}
					}
					
					.piece-details {
						@include square-shadow(rgba(255, 255, 255, .25));
						border: 1px solid white;
						transition: all 0.3s cubic-bezier(.25,.8,.25,1);
						
						a {
							text-decoration: none;
						}
						
						h2 {
							@include portfolio-piece-title;
						}

						.description {
							margin-bottom: 10px;
						}

						.nature-of-contributions {
							font-size: 12px;
						}
					}
				}
			}
		}
	}
</style>