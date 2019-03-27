<template>

	<div class="daily-schedule-event-listing">
		<DailyScheduleEventList :layout="layout"></DailyScheduleEventList>
		<DailyScheduleEventDetails></DailyScheduleEventDetails>
	</div>
	
</template>

<script>

	import DailyScheduleEventList from './DailyScheduleEventList.vue';
	import DailyScheduleEventDetails from './DailyScheduleEventDetails.vue';

	export default {
		name: 'DailyScheduleEventListing',
		
		props: ['layout'],
		
		components: {
			DailyScheduleEventList,
			DailyScheduleEventDetails
		},
		
		computed: {
			
			currentDate: function() {
				
				return this.$store.getters.getCurrentDate;
			}
		}
	}
	
</script>