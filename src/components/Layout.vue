<template>
	<div class="container-fluid">
		<Title></Title>
		<div class="layout-wrapper">
			<Nav></Nav>
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import Title from './Title.vue';
	import Nav from './Nav.vue';
	
	export default {
		name: 'Layout',
		
		components: {
			Title,
			Nav
		}
	}
</script>

