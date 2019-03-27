<template>

	<div class="sort-dropdown">
		<div class="attractions-dropdown-toggle" v-on:click="toggleDropdown" v-bind:class="{'active' : showSorting}">
			Sort By
			
			<span class="current-sort">{{ this.currentSortText }} </span>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 14 8" xml:space="preserve">
				<path d="M7,5.6l5.3-5.3c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4l-6,6c-0.4,0.4-1,0.4-1.4,0l-6-6c-0.4-0.4-0.4-1,0-1.4 s1-0.4,1.4,0L7,5.6z"/>
			</svg>	
		</div>
		<div class="dropdown-options" v-bind:class="{'active' : showSorting}">
			<ul>
				<li v-on:click="$emit('sort-featured'); sortFeatured(); closeDropdown();" v-bind:class="{'active' : sortedByFeatured}">Featured</li>
				<li v-on:click="$emit('sort-alphabetical'); sortAlphabetical(); closeDropdown();" v-bind:class="{'active' : sortedByAlpha}">Alphabetical</li>
				<li v-on:click="$emit('sort-location'); sortLocation(); closeDropdown();" v-bind:class="{'active' : sortedByLocation}">Location</li>
			</ul>
		</div>
	</div>

</template>

<script>
	export default {
		name: 'AttractionsGridSorting',
		data() {
			
			return {
				showSorting: false,
				sortedByFeatured: false,
				sortedByAlpha: false,
				sortedByLocation: false,
				currentSortText: ""
			}
		},
		
		methods: {
			
			toggleDropdown: function() {
				
				this.showSorting = !this.showSorting;
			},
			
			closeDropdown: function() {
				this.showSorting = false;
			},
			
			compareSortOrder: function(a, b) {
				if (a.sortOrder < b.sortOrder) return -1;
				if (a.sortOrder > b.sortOrder) return 1;
				return 0;
			},
			
			removeSort: function() {
				this.currentSortText = "";
			},
				
			sortFeatured: function() {
				event.stopPropagation();
				this.sortedByFeatured = true, this.sortedByAlpha = false, this.sortedByLocation = false;
				this.currentSortText = "Featured";
			},
			
			sortAlphabetical: function() {
				event.stopPropagation();
				this.sortedByFeatured = false, this.sortedByAlpha = true, this.sortedByLocation = false;
				this.currentSortText = "Alphabetical";
			},
			
			sortLocation: function() {
				event.stopPropagation();
				this.sortedByFeatured = false, this.sortedByAlpha = false, this.sortedByLocation = true;
				this.currentSortText = "Location";
			}
		}
	}
</script>