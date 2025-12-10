<template>
	<div class="layout-slot">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'Layout'
	}
</script>

<style scoped>
/* Avoid affecting layout sizing */
.layout-slot {
	display: contents;
	width: 100%;
}
</style>

