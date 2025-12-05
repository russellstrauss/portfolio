<template>
	<div class="category-detail container-fluid" :class="category.path">
		
		<Title></Title>
		
		<div class="layout-wrapper">
			<Nav></Nav>
			<div class="main-content">
				<div class="category-content">
					<header>
						<h1>{{ category.title }}</h1>
						<div class="category-description" v-if="category.description">
							<p>{{ category.description }}</p>
						</div>
					</header>
					
					<transition-group :class="viewType" name="stagger-grid" tag="ul"  v-on:enter="gridItemEnter" v-on:leave="gridItemLeave">
						<li v-for="(piece, index) in pieces" :key="piece.sortOrder" class="each-piece" :style="'background-image: url(' + getImageUrl(piece.featuredImage) + ');'" :data-index="index">
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
				category: {},
				pieces: [],
				viewType: 'grid' // grid or list
			};
		},

		methods: {
			
			getImageUrl: function(imagePath) {
				if (!imagePath) return '';
				// If the path is already absolute with base URL, return as is
				const baseUrl = import.meta.env.BASE_URL || '/';
				// If path already starts with base URL, return as is
				if (imagePath.startsWith(baseUrl)) {
					return imagePath;
				}
				// If path starts with /, prepend base URL (removing trailing slash from base if present)
				if (imagePath.startsWith('/')) {
					const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
					return normalizedBase + imagePath;
				}
				// Otherwise return as is (relative paths)
				return imagePath;
			},
			
			handleLinkClick: function(event, href, openInNewTab) {
				// If the link should open in a new tab, let the browser handle it
				// The target="_blank" attribute will be respected
				if (openInNewTab === "true") {
					return; // Allow default behavior (opens in new tab)
				}
				
				// Define known Vue routes - all other routes should bypass the router
				const vueRoutes = ['/', '/work', '/about', '/resume'];
				const isVueRoute = vueRoutes.some(route => href === route || href.startsWith(route + '/'));
				
				// If it's not a Vue route (or is external), force full page navigation
				// This allows static files in public/ to be served directly by Vite
				if (href && !isVueRoute) {
					event.preventDefault();
					window.location.href = href;
				}
			},
			
			getCategories: function() {
				
				return axios.get(import.meta.env.BASE_URL + 'data/categories.json');
			},
			
			getPieces: function() {
				
				return axios.get(import.meta.env.BASE_URL + 'data/pieces.json');
			},
			
			gridItemEnter: function (element) {
				
				var delay = element.dataset.index * 75;
				setTimeout(function () {
					element.classList.add('active');
				}, delay);
			},
			
			gridItemLeave: function (element) {
				
				var delay = element.dataset.index * 75;
				setTimeout(function () {
					element.classList.remove('active');
				}, delay);
			}
		},

		mounted: function () {
			
			let self = this;
			
			// console.log(self.$route.params);
			
			axios.all([self.getCategories(), self.getPieces()]).then(axios.spread(function (categories, pieces) {

				let categoryResponse = categories.data.categories.filter(category => category.path === self.$route.params.category)[0];
				if (categoryResponse) self.category = categoryResponse;
				let piecesResponse = pieces.data.categories.filter(category => category.path === self.$route.params.category)[0];
				if (piecesResponse) self.pieces = piecesResponse.pieces.filter(piece => piece.published === "true");
			}))
			.catch(function (error) {
				console.log(error);
			});
		}
	};
</script>

<style lang="scss">

	.category-detail {
		
		&.web-application-development {
			ul.grid .each-piece { // allow some extra mobile space for cool overlap effect on long content
				@include mobile-only {
					margin-bottom: 200px;
				}
			}
		}
		
		.category-content {
			
			header {
				margin-bottom: 100px;
			}
			
			.category-description {
				margin-bottom: 50px;
			}
			
			ul {
				&.grid {
					
					@include tablet {
						display: flex;
						flex-wrap: wrap;
					}
					
					.each-piece {
						background-size: cover;
						background-position: center center;
						position: relative;
						
						@include tablet {
							@include grid(2, 100);
						}
						
						&:hover {
							
							.piece-details {
								background-color: rgba(255, 255, 255, .75);
								
								.text-block {
									background-color: white;
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
							
							.row {
								display: flex;
								justify-content: space-between;
								align-items: flex-start;
								margin-bottom: 15px;
								
								h2 {
									
									@include mobile-only {
										font-size: 22px;
									}
									
									span {
										@include square-shadow;
										background-color: white;
										border: 1px solid black;
										padding: 5px 10px;
										line-height: 2;
									}
								}
								
								.year {
									@include square-shadow;
									background-color: white;
									border: 1px solid black;
									font-size: 18px;
									
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
								
								@include mobile-only {
									background-color: rgba(white, .9);
									padding: 10px;
									margin-bottom: 20px;
								}
								
								@include tablet {
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
					
				}
			
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