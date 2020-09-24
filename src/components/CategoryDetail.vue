<template>
	<div class="category-detail">
		
		
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
					
					<ul>
						<li v-for="piece in pieces" :key="piece.sortOrder" class="each-piece">
							<div class="featured-image" v-if="piece.featuredImage">
								<a :href="piece.href" :target="JSON.parse(piece.openInNewTab) ? '_blank' : '_self'"><img v-if="piece.featuredImage" :src="piece.featuredImage" alt="featured-image"></a>
							</div>
							
							<div class="piece-details">
								<h2><a :href="piece.href" :target="JSON.parse(piece.openInNewTab) ? '_blank' : '_self'">{{ piece.title }}</a></h2>
								<p class="description">{{ piece.description }}</p>
								<p class="nature-of-contributions" v-if="piece.natureOfContributions">Nature of contributions: {{ piece.natureOfContributions }}</p>
							</div>
						</li>
					</ul>
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
				pieces: []
			};
		},

		methods: {
			
			getCategories: function() {
				
				return axios.get('/data/categories.json');
			},
			
			getPieces: function() {
				
				return axios.get('/data/pieces.json');
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


	.category-content {
		
		header {
			margin-bottom: 100px;
		}
		
		.category-description {
			margin-bottom: 50px;
		}
		
		.each-piece {
			margin-bottom: 30px;

			@include mobile-only {
				margin-bottom: 150px;
			}

			@include desktop {
				display: flex;
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
				
				a {
					text-decoration: none;
				}
				
				h2 {
					@include portfolioPieceTitle;
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
</style>