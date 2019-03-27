<template>


	<div class="daily-schedule container" v-bind:class="'layout-' + layout"> <!-- layout variable can be "simple" or "advanced" -->
		
		<link href="https://fonts.googleapis.com/css?family=Libre+Baskerville:400,700|Montserrat:400,600,700" rel="stylesheet">
		<DailyScheduleIntro v-if="currentDate" :title="title" :subtitle="subtitle" :layout="layout" v-on:date-prev="datePrev" v-on:date-next="dateNext"></DailyScheduleIntro>
		<DailyScheduleSortOrder v-if="layout === 'advanced'"></DailyScheduleSortOrder>
		<DailyScheduleParkFilter v-if="layout === 'advanced'"></DailyScheduleParkFilter>
		<DailyScheduleEventListing v-if="currentDate" :layout="layout"></DailyScheduleEventListing>
		
	</div>
	
</template>

<script>

	import DailyScheduleIntro from './DailyScheduleIntro.vue';
	import DailyScheduleSortOrder from './DailyScheduleSortOrder.vue';
	import DailyScheduleParkFilter from './DailyScheduleParkFilter.vue';
	import DailyScheduleEventListing from './DailyScheduleEventListing.vue';
	import axios from 'axios';
	import moment from 'moment';
	
	export default {
		name: 'DailySchedule',
		
		components: {
			DailyScheduleIntro,
			DailyScheduleSortOrder,
			DailyScheduleParkFilter,
			DailyScheduleEventListing
		},
		
		data() {
			return {
				layout: "",
				title: "",
				subtitle: "",
				scheduleDisclaimer: "",
				dates: []
			}
		},
		
		computed: {
			
			currentDate: function() {
				
				return this.$store.getters.getCurrentDate;
			}
		},
		
		mounted: function() {
			
			let self = this;
		
			// get data from Sitecore API
			let endpoint = location.protocol + '//' + window.location.host + '/wp-content/themes/minimal/assets/js/vue/src/components/DailySchedule/DailyScheduleExampleData.json';
			//let endpoint = location.protocol + '//' + window.location.host + '/api/sitecore/WorkApi/DailyScheduleExampleData';

			axios.get(endpoint).then(function(response) {
				
				self.title = response.data.title;
				self.subtitle = response.data.subtitle;
				self.layout = response.data.layout;
				self.scheduleDisclaimer = response.data.scheduleDisclaimer;
				self.dates = response.data.dates;
				
				self.$store.dispatch('setCurrentDate', self.dates[0]);
				
				self.setDefaultEvent();
			})
			.catch(function (error) {
				/* eslint-disable no-console */
				console.log(error);
				/* eslint-enable no-console */
			});
		},
		
		methods: {
			
			setDefaultEvent: function() {
				
				let defaultEventDisplay = this.sortEvents(this.currentDate.events).find(function(event) {
					return event.featured;
				});
				
				if (!defaultEventDisplay) { // if no featured events, just select the first one
					defaultEventDisplay = this.sortEvents(this.currentDate.events)[0];
				}
				
				this.$store.dispatch('setSelectedEvent', defaultEventDisplay);
			},
			
			datePrev: function() {
				
				if ((this.getCurrentDateIndex() - 1) !== -1) {
					
					let prevDate =  this.dates[this.getCurrentDateIndex() - 1];
					this.$store.dispatch('setCurrentDate', prevDate);
					
					this.setDefaultEvent();
				}
			},
			
			dateNext: function() {
				
				if ((this.getCurrentDateIndex() + 1) !== (this.dates.length)) {
					
					let nextDate = this.dates[this.getCurrentDateIndex() + 1];
					this.$store.dispatch('setCurrentDate', nextDate);
					
					this.setDefaultEvent();
				}
			},
			
			getCurrentDateIndex: function() {
				
				let self = this;
				
				function checkMatchingObject(object) {
					return self.$store.getters.getCurrentDate === object;
				}
				
				return self.dates.findIndex(checkMatchingObject);
			},
			
			sortEvents: function(array) {
				
				let unsortedEvents = array;
				let sortedEvents;
				
				function compareAlpha(a, b) {
					if (a.eventName < b.eventName) return -1;
					if (a.eventName > b.eventName) return 1;
					return 0;
				}
				
				function compareStartTime(a, b) {
					
					if (moment(a.startTime).isBefore(moment(b.startTime))) return -1;
					if (moment(b.startTime).isBefore(moment(a.startTime))) return 1;
					return 0;
				}
				
				if (this.$store.getters.getSortByTime) {
					
					sortedEvents = unsortedEvents.sort(compareStartTime);
				}
				else {
					
					sortedEvents = unsortedEvents.sort(compareAlpha);
				}
				
				return sortedEvents;
			}
		}
	}
	
</script>