<template>

	<div class="active-filters">
		
		<div class="custom-hfe-cb checked" v-bind:key="filterOption.filterID" v-for="filterOption in activeFilters" v-on:click="$emit('remove-filter', filterOption);">
			<input type="checkbox">
			<label><span>{{ filterOption.filterDisplayName }}</span></label>
		</div>
		
		<div class="clear-all" v-on:click="$emit('clear-all-filters');">
			Clear All
		</div>

	</div>

</template>

<script>
	export default {
		name: 'AttractionsGridActiveFilters',
		props: ['activeFilters']
	}
</script>