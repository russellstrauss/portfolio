<template>

	<div class="attraction-filter-grid container">
		
		<div class="intro" v-bind:introContent="introContent">

			<h5 class="subtitle" >{{ introContent.subtitle }}</h5>

			<h2>{{ introContent.title }}</h2>
		
			<div class="body">
				<p>{{ introContent.body }}</p>
			</div>
			
		</div>
		
		<div class="filters-list swiper-container">
			
			<ul class="categories swiper-wrapper" v-bind:categoryList="categoryList">
				
				<li class="active" v-on:click="showAllCategories">All</li>
				<li class="swiper-slide" v-bind:key="category.categoryID" v-for="category in categoryList" v-on:click="filterByCategory($event, category)">{{ category.categoryDisplayName }}</li>
				
			</ul>
			
		</div>
		
		<div class="sort-and-filter">
			<AttractionsGridFilters v-bind:filterFacets="filterFacets" v-on:toggle-filter="toggleFilter"></AttractionsGridFilters>
			<AttractionsGridSorting v-on:sort-alphabetical="sortAlphabetical" v-on:sort-featured="sortFeatured" v-on:sort-location="sortLocation"></AttractionsGridSorting>
		</div>
		
		<AttractionsGridActiveFilters v-bind:activeFilters="activeFilters" v-bind:class="{'active' : activeFilters.length}" v-on:clear-all-filters="clearAllFilters" v-on:remove-filter="removeFilter"></AttractionsGridActiveFilters>
		<AttractionsGrid v-bind:currentItems="currentItems" :emptyResultsMessage="emptyResultsMessage"></AttractionsGrid>
		
		<button class="cta" v-if="!showAll && currentItems.length !== 0 && filterResult.length >= defaultNumberOfItemsShown" v-on:click="showAllItems">Load More</button>
	</div>
	
</template>

<script>

	import AttractionsGridFilters from './AttractionsGridFilters.vue';
	import AttractionsGridSorting from './AttractionsGridSorting.vue';
	import AttractionsGridActiveFilters from './AttractionsGridActiveFilters.vue';
	import AttractionsGrid from './AttractionsGrid.vue';
	import axios from 'axios';

	export default {
		name: 'attractionsFilterGrid',
		components: {
			AttractionsGridFilters,
			AttractionsGridSorting,
			AttractionsGridActiveFilters,
			AttractionsGrid
		},
		
		data() {
			return {
				introContent: "",
				categoryList: [],
				gridItems: [],
				currentItems: [],
				filterResult: [],
				filterFacets: [],
				activeFilters: [],
				activeCategory: [],
				currentSort: "Default Sort Order",
				emptyResultsMessage: "",
				defaultNumberOfItemsShown: 6,
				showAll: false
			}
		},
		
		mounted: function() {
			
			let self = this;
		
			// get data from Sitecore API
			let endpoint = location.protocol + '//' + window.location.host + '/assets/js/vue/hfe-vue/src/components/AttractionsFilterGrid/AttractionsFilterGridExampleData.json';
			//let endpoint = location.protocol + '//' + window.location.host + '/api/sitecore/WorkApi/AttractionsFilterGrid';

			axios.get(endpoint).then(function(response) {			
				self.introContent = response.data.introContent;
				self.categoryList = response.data.categoryList;
				self.filterFacets = response.data.filterFacets;
				self.gridItems = response.data.gridItems;
				self.filterResult = response.data.gridItems;
				self.currentItems = self.resort(response.data.gridItems).slice(0, self.defaultNumberOfItemsShown);
				self.emptyResultsMessage = response.data.emptyResultsMessage;
			})
			.catch(function (error) {
				/* eslint-disable no-console */
				console.log(error);
				/* eslint-enable no-console */
			});
		},
		
		methods: {
			
			toggleFilter: function(filterFacetOption) {
				
				filterFacetOption.active = !filterFacetOption.active;
				
				if (filterFacetOption.active) {
					this.activeFilters.push(filterFacetOption);
				}
				else {
					this.removeFilter(filterFacetOption);
				}
				
				this.updateViewWithFilters();
			},
			
			clearAllFilters: function() {
				
				this.activeFilters = [];
				
				this.filterFacets.forEach(function(facet) {
					
					facet.filterFacetOptions.forEach(function(facetOption) {
						
						facetOption.active = false;
					});
				});
				
				this.updateViewWithFilters();
			},
			
			removeFilter: function(facet) {
				
				this.activeFilters = this.activeFilters.filter(function(activeFilter) {
					if (activeFilter.filterID === facet.filterID) facet.active = false;
					return activeFilter.filterID !== facet.filterID;
				});
				
				this.updateViewWithFilters();
			},
			
			showAllCategories: function() {
				
				this.activeCategory = [];
				this.removeActiveTabState();
				event.target.classList.add('active');
				this.showAll = false;
				
				this.updateViewWithFilters();
			},
			
			removeActiveTabState: function() {
				
				this.$el.querySelectorAll('.filters-list li').forEach(function(category) {
					category.classList.remove('active');
				});
			},
			
			filterByCategory: function(event, category) {
				
				this.removeActiveTabState();
				event.target.classList.add('active');
				
				this.activeCategory = category;
				this.showAll = false;
				
				this.updateViewWithFilters();
			},
			
			showAllItems: function() {
				
				this.showAll = true;
				this.updateViewWithFilters();
			},
			
			updateViewWithFilters: function() {
				
				let self = this;
				
				this.filterResult = this.gridItems.filter(function(gridItem) {
					
					let match = false;
					
					gridItem.categoryList.forEach(function(gridItemCategory) {
						
						let categoriesMatchOrEmpty = (self.activeCategory.categoryID === gridItemCategory.categoryID || self.activeCategory.length === 0);

						if (self.activeFilters.length === 0 && categoriesMatchOrEmpty) { // if no filters are applied, and category is selected
							
							match = true;
						}
						if (self.activeFilters.length === 0) return true; // if no filters are applied, show all
						
						gridItem.filterTags.forEach(function(tag) {
							
							self.activeFilters.forEach(function(activeFilter) {
								
								let filtersMatch = (tag.filterID === activeFilter.filterID);
								
								if (filtersMatch && categoriesMatchOrEmpty) { // if category is selected and filters are applied
									
									match = true;
								}
							});
						});
					});
					
					return match;
				});
				
				if (this.showAll) {
					this.currentItems = this.resort(this.filterResult);
				}
				else {
					this.currentItems = this.resort(this.filterResult).slice(0, this.defaultNumberOfItemsShown);
				}
			},
			
			resort: function(array) {
				
				if (this.currentSort === "Default Sort Order") {
					return this.sortByDefaultSortOrder(array);
				}
				else if (this.currentSort === "Alphabetical") {
					return this.sortByAlphabet(array);
				}
				else if (this.currentSort === "Location") {
					return this.sortByLocation(array);
				}
				else if (this.currentSort === "Featured") {
					return this.sortByFeatured(array);
				}
			},
			
			sortByDefaultSortOrder: function(array) {
				
				function compareSortOrder(a, b) {
					if (a.defaultSortOrder < b.defaultSortOrder) return -1;
					if (a.defaultSortOrder > b.defaultSortOrder) return 1;
					return 0;
				}
				
				return array.sort(compareSortOrder);	
			},
			
			sortByAlphabet: function(array) {
				
				function compareAlpha(a, b) {
					if (a.title < b.title) return -1;
					if (a.title > b.title) return 1;
					return 0;
				}
				
				this.currentSort = "Alphabetical";
				return array.sort(compareAlpha);
			},
			
			sortByLocation: function(array) {
				
				function compareAlpha(a, b) {
					if (a.location < b.location) return -1;
					if (a.location > b.location) return 1;
					return 0;
				}
				
				this.currentSort = "Location";
				return array.sort(compareAlpha);
			},
			
			sortByFeatured: function(array) {
				
				let featured = array.filter(function(attraction) { // take all featured by sortOrder
					return attraction.featured;
				}).sort(this.compareSortOrder);
				
				let nonFeatured = array.filter(function(attraction) { // then nonFeatured, also by sortOrder
					return !attraction.featured;
				}).sort(this.compareSortOrder);
				
				this.currentSort = "Featured";
				return featured.concat(nonFeatured);
			},
			
			sortAlphabetical: function() {
				
				this.currentItems = this.sortByAlphabet(this.currentItems);
			},
			
			sortLocation: function() {
				
				this.currentItems = this.sortByLocation(this.currentItems);
			},
			
			sortFeatured: function() {
				
				this.currentItems = this.sortByFeatured(this.currentItems);
			}
		}
	};
	
</script>