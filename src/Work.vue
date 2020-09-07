<template>
	<div>
		<Nav></Nav>
	</div>
</template>

<script>

	import Nav from './components/Nav.vue';
	
	export default {
		name: 'Work',

		components: {
			Nav
		},

		data() {
			return {};
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