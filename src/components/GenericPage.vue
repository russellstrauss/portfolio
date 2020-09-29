<template>
	<div class="generic-page">
		
		<Title></Title>
		<div class="layout-wrapper">
			<Nav></Nav>
			
			<div class="main-content">
				<h1>{{details.title}}</h1>
				<div v-if="details.rawHTML" class="raw-html-container">
					<div v-html="details.rawHTML"></div>
				</div>
				<a class="callout" v-if="details.applicationLink" :href="details.applicationLink.href">
					{{details.applicationLink.text}}
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 108.42 1280 1063.16" xml:space="preserve">
						<g>
							<path d="M84.859,738.095l-1.954-0.428h837.055l-263.14,263.72c-12.886,12.875-19.954,30.316-19.954,48.622
								c0,18.307,7.068,35.627,19.954,48.532l40.944,40.965c12.875,12.875,30.032,19.994,48.328,19.994
								c18.306,0,35.473-7.068,48.348-19.943l451.071-451.03c12.926-12.927,19.994-30.145,19.943-48.46
								c0.051-18.417-7.018-35.646-19.943-48.552L794.441,140.443c-12.875-12.865-30.031-19.943-48.348-19.943
								c-18.296,0-35.453,7.089-48.328,19.943l-40.944,40.966c-12.886,12.854-19.954,30.021-19.954,48.327
								c0,18.296,7.068,34.558,19.954,47.423L922.93,542.353H83.924c-37.701,0-69.38,32.494-69.38,70.173v57.939
								C14.543,708.144,47.159,738.095,84.859,738.095z"/>
						</g>
					</svg>
				</a>
				
				<!-- <div id="example1"></div>
				<script>PDFObject.embed("/pdf/sample-3pp.pdf", "#example1");</script> -->
			</div>
		</div>
	</div>
</template>

<script>
	
	import Title from './Title.vue';
	import Nav from './Nav.vue';
	import axios from 'axios';
	
	export default {
		
		name: 'GenericPage',

		components: {
			Nav,
			Title
		},

		data() {
			return {
				details: {}
			};
		},

		methods: {},

		mounted: function () {
			
			let self = this;
			
			let pieces = '/data/pieces.json';
			axios.get(pieces).then(function(response) {
				
				let categories = response.data.categories;
				let category = categories.filter(category => category.path === self.$route.params.category);
				
				if (category[0]) self.details = category[0].pieces.filter(details => details.href === self.$route.path)[0];
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	};
</script>

<style lang="scss">
	.generic-page {
		
		h1 {
			margin-bottom: 100px;
		}
	}
</style>