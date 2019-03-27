<template>
	
	<div class="filters-dropdown">
		
		<div class="attractions-dropdown-toggle" v-on:click="toggleDropdown" v-bind:class="{'active' : showFilters}">
			Filter By
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 14 8" xml:space="preserve">
				<path d="M7,5.6l5.3-5.3c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4l-6,6c-0.4,0.4-1,0.4-1.4,0l-6-6c-0.4-0.4-0.4-1,0-1.4 s1-0.4,1.4,0L7,5.6z"/>
			</svg>
		</div>
		
		<div class="dropdown-options" v-bind:class="{'active' : showFilters}">
			<div class="filter-facet"  v-bind:key="filterFacet.filterFacetID" v-for="filterFacet in filterFacets">
				<div class="filter-label">{{ filterFacet.filterFacetLabel }}</div>
				<div class="filter-options">
					<div class="filter-option" v-bind:key="filterFacetOption.filterID" v-for="filterFacetOption in filterFacet.filterFacetOptions" v-on:click="$emit('toggle-filter', filterFacetOption);">
						
						<div class="custom-hfe-cb" v-bind:class="{'checked' : filterFacetOption.active}">
							<input type="checkbox">
							<label><span>{{ filterFacetOption.filterDisplayName }}</span></label>
						</div>
						
					</div>
				</div>
			</div>
			<button class="close-dropdown" v-on:click="closeDropdown"></button>
		</div>
	</div>
	
</template>

<script>
	export default {
		name: 'AttractionsGridFilters',
		props: ['filterFacets'],
		data() {
			
			return {
				showFilters: false
			}
		},
		
		methods: {
			
			toggleDropdown: function() {
				
				this.showFilters = !this.showFilters;
			},
			
			closeDropdown: function() {
				
				this.showFilters = false;
			}
		}
	}
</script>