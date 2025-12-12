<template>
	<Layout>
		<div class="detail-page">
			<div class="main-content">
				{{ $route.params.path }}
				{{ $route.params.id }}

				<PageTitle v-if="details.title" :title="details.title"></PageTitle>
				{{ details.description }}
			</div>
		</div>
	</Layout>
</template>

<script>
	
	import Layout from './Layout.vue';
	import PageTitle from './PageTitle.vue';
	import axios from 'axios';
	
	export default {
		
		name: 'DetailPage',

		components: {
			Layout,
			PageTitle
		},

		data() {
			return {
				details: {
					url: "",
					title: "",
					description: "",
					natureOfContributions: "",
					featuredImage: "",
					href: ""
				}
			};
		},

		methods: {},

		mounted: function () {
			let self = this;
			
			console.log(self.$route.params);
			
			let pieces = '/data/pieces.json';
			axios.get(pieces).then(function(response) {
				
				let categories = response.data.categories;
				let category = categories.filter(category => category.path === self.$route.params.path)[0];
				
				
				console.log(category);
				if (category) self.details = category.pieces.filter(details => details.internalURL === self.$route.params.id)[0];
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	};
</script>

<style lang="scss">

</style>