<template>

	<div class="sorting-selector">
		
		<ul class="sort-by">
			<li v-bind:class="{'active' : sortedByTime }" v-on:click="setSortByTime">List By Time</li>
			<li v-bind:class="{'active' : sortedByActivity }" v-on:click="setSortByActivity">List By Activity</li>
		</ul>
		
	</div>
	
</template>

<script>

	export default {
		name: 'DailyScheduleSortOrder',
		
		components: {
			
		},
		
		data() {
			
			return {
				
			}
		},
		
		computed: {
			
			sortedByTime: function() {
				
				return this.$store.getters.getSortByTime;
			},
			
			sortedByActivity: function() {
				
				return this.$store.getters.getSortByActivity;
			}
		},
		
		methods: {
			
			setSortByTime: function() {
				
				this.$store.dispatch('setSortByTime');
			},
			
			setSortByActivity: function() {
				
				this.$store.dispatch('setSortByActivity');
			}
		}
	}
	
</script>