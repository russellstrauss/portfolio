<template>
	<div class="detail-page">
		
		<div class="layout-wrapper">
			<div>
				<h1>{{ category.title }}</h1>
				<p>{{ category.description }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	
	import axios from 'axios';
	
	export default {
		
		name: 'DetailPage',

		components: {},

		data() {
			return {
				details: {
					title: "",
					path: "",
					description: "",
					markup: ""
				}
			};
		},

		methods: {},

		mounted: function () {
			
			let self = this;
			let pieces = '/data/pieces.json';
			axios.get(pieces).then(function(response) {
				
				// let pieces = response.data.pieces;
				// self.category = pieces.filter(category => category.path === self.$route.params.path)[0];
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	};
</script>

<style lang="scss">

</style>