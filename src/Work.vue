<template>
	<div>
		<Title></Title>
		<Nav></Nav>
	</div>
</template>

<script>

	import Title from './components/Title.vue';
	import Nav from './components/Nav.vue';
	
	export default {
		name: 'Work',

		components: {
			Nav,
			Title
		},

		data() {
			return {
				categories: [
					{
						title: 'Web Application Development',
						path: ''
					}
				]
			};
		},

		methods: {},

		mounted: function () {
			
			// $('#category-container').find('.portfolio-category').each(function(i) {
			// 	var $menuItem = $(this);
				
			// 	setTimeout(function() {
			// 		$menuItem.css({'margin-left': '0', 'opacity': 1});
			// 	}, i * 75);
			// });
			
		},
	};
</script>

<style lang="scss">
	
</style>