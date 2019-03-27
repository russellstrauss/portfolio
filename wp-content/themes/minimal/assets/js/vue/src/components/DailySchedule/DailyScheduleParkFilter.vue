<template>

	<div class="park-filter">
		
		<div class="filter-dropdown">
			<div class="park-dropdown-toggle" v-on:click="toggleFilterDropdown" v-bind:class="{'active' : showParkFilter}">
				Filter
				
				<span class="current-filter">{{ activeParkFilterText }} </span>
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 14 8" xml:space="preserve">
					<path d="M7,5.6l5.3-5.3c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4l-6,6c-0.4,0.4-1,0.4-1.4,0l-6-6c-0.4-0.4-0.4-1,0-1.4 s1-0.4,1.4,0L7,5.6z"/>
				</svg>	
			</div>
			<div class="dropdown-options" v-bind:class="{'active' : showParkFilter}">
				<ul>
					<li v-bind:class="{'active' : currentParkFilter.length === 0}" v-on:click="removeParkFilters">All Parks</li>
					<li v-bind:key="park.id" v-for="park in currentDate.parks" v-on:click="setParkFilter(park)" v-bind:class="{'active' : park.filterApplied}">{{ park.title }}</li>
				</ul>
			</div>
		</div>
		
	</div>
	
</template>

<script>

	export default {
		name: 'DailyScheduleParkFilter',

		data() {
			
			return {
				showParkFilter: false,
				activeParkFilterText: "All Parks"
			}
		},
		
		methods: {
			
			toggleFilterDropdown: function() {
				
				this.showParkFilter = !this.showParkFilter;
			},
			
			setParkFilter: function(park) {
				
				this.showParkFilter = false;
				this.activeParkFilterText = park.title;
				this.$store.dispatch('setCurrentParkFilter', park);
			},
			
			removeParkFilters: function() {
				
				this.showParkFilter = false;
				this.activeParkFilterText = "All Parks";
				this.$store.dispatch('setCurrentParkFilter', []);
			}
		},
		
		computed: {
			
			currentDate: function() {
				
				return this.$store.getters.getCurrentDate;
			},
			
			currentParkFilter: function() {
				
				return this.$store.getters.getCurrentParkFilter;
			}
		}
	}
	
</script>