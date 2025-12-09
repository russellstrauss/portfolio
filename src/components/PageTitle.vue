<template>
	<header class="page-title">
		<h1>{{ title }}</h1>
	</header>
</template>

<script>
	export default {
		name: 'PageTitle',
		
		props: {
			title: {
				type: String,
				required: true
			}
		}
	}
</script>

<style lang="scss">
	@use '@/sass/mixins' as *;
	
	.page-title {
		margin-bottom: 80px;
		
		h1 {
			@include heading-font;
			font-size: 32px;
			margin-bottom: 0;
		}
	}
</style>

