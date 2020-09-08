<template>
	<div class="category-detail">
		
		<Title></Title>
		
		<div class="layout-wrapper">
			<Nav></Nav>
			<div class="main-content">
				<div class="category-content">
					<h1>{{ category.title }}</h1>
					<div class="category-description" v-if="category.description">
						<p>{{ category.description }}</p>
					</div>
					
					<ul>
						<li v-for="piece in pieces" :key="piece.title" class="each-piece">
							<div class="featured-image">
								<a :href="piece.href" target="_blank"><img v-if="piece.featuredImage" :src="piece.featuredImage" alt="featured-image"></a>
							</div>
							
							<div class="piece-details">
								<h2><a :href="piece.href" target="_blank">{{ piece.title }}</a></h2>
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
			axios.all([self.getCategories(), self.getPieces()]).then(axios.spread(function (categories, pieces) {

				
				self.category = categories.data.categories.filter(category => category.path === self.$route.params.path)[0];
				self.pieces = pieces.data.categories.filter(category => category.path === self.$route.params.path)[0].pieces;
				console.log(self.pieces);
			}))
			.catch(function (error) {
				console.log(error);
			});
		}
	};
</script>

<style lang="scss">
	.featured-image {
		max-width: 250px;
		margin-right: 20px;
		
		img {
			border: 1px solid black;
		}
	}
</style>