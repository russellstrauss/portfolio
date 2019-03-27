<template>

	<div class="event-list">
		
		<div class="events">
			
			<header class="featured-events-label" v-if="featuredEventsNotNull && layout === 'advanced'">Featured Events</header>
			
			<ul v-if="featuredEventsNotNull && layout === 'advanced'">
				<li v-bind:key="event.eventID" v-for="event in featuredEvents" v-on:click="loadEventDetails(event)" v-bind:class="{'active': event.currentlySelected, 'sort-by-activity': sortedByActivity}">
					<div class="time">{{ event.startTime | moment("h:mm A") }}</div>
					<div class="title-and-location">
						<h3>{{  event.eventName }}</h3>
						<div class="location">{{ event.eventLocation }}</div>
					</div>
					
					<svg class="icon-arrow-right-thin" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15.6 28.7" xml:space="preserve">
						<path d="M1.7,0.3l13.5,13.3c0.9,0.9-0.5,2.4-1.4,1.4L0.3,1.7C-0.6,0.8,0.8-0.6,1.7,0.3z M0.3,26.9 l13.5-13.3c0.9-0.9,2.4,0.5,1.4,1.4L1.7,28.4C0.8,29.3-0.6,27.9,0.3,26.9z"/>
					</svg>
				</li>
			</ul>
			
			<header class="all-events-label" v-if="layout === 'advanced'">All Events</header>
			
			<ul v-if="allEventsNotNull">
				<li v-bind:key="event.eventID" v-for="event in allEvents" v-on:click="loadEventDetails(event)" v-bind:class="{'active': event.currentlySelected, 'sort-by-activity': sortedByActivity}">
					<div class="time">{{ event.startTime | moment("h:mm A") }}</div>
					<div class="title-and-location">
						<h3>{{  event.eventName }}</h3>
						<div class="location">{{ event.eventLocation }}</div>
					</div>
					
					<svg class="icon-arrow-right-thin" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15.6 28.7" xml:space="preserve">
						<path d="M1.7,0.3l13.5,13.3c0.9,0.9-0.5,2.4-1.4,1.4L0.3,1.7C-0.6,0.8,0.8-0.6,1.7,0.3z M0.3,26.9 l13.5-13.3c0.9-0.9,2.4,0.5,1.4,1.4L1.7,28.4C0.8,29.3-0.6,27.9,0.3,26.9z"/>
					</svg>
				</li>
			</ul>
		</div>
	</div>
	
</template>

<script>
	
	import moment from 'moment';

	export default {
		
		name: 'DailyScheduleEventList',
		
		props: ['layout'],
		
		computed: {
			
			currentDate: function() {
				
				return this.$store.getters.getCurrentDate;
			},
			
			sortedByActivity: function() {
				
				return this.$store.getters.getSortByActivity;
			},
			
			featuredEvents: function() {
				
				if (this.currentDate.events) {
					
					let events = this.currentDate.events.filter(function(event) {
						return event.featured;
					});
					
					return this.sortEvents(this.filterEventsByPark(events));
				}
				
				return null;
			},
			
			featuredEventsNotNull: function() {
				
				if (this.featuredEvents) {
					
					return this.featuredEvents.length;
				}
				
				return null;
			},
			
			allEvents: function() {
				
				if (this.currentDate.events) {
					
					return this.sortEvents(this.filterEventsByPark(this.currentDate.events));
				}
				
				return null;
			},
			
			allEventsNotNull: function() {
				
				if (this.allEvents) {
					
					return this.allEvents.length;
				}
				
				return null;
			},
			
			currentParkFilter: function() {
				
				return this.$store.getters.getCurrentParkFilter;
			}
		},
		
		methods: {
			
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
			},
			
			filterEventsByPark: function(array) {
				
				let self = this;
				
				if (this.currentParkFilter.length === 0) {
					return array;
				}
					
				let result = array.filter(function(event) {
					
					let matchFound = false;
					event.parkLocations.forEach(function(park) {
						
						if (park.id === self.currentParkFilter.id) {
							matchFound = true;
						}
					});
					
					return matchFound;
				});
				
				return result;
			},
			
			loadEventDetails: function(event) {
				
				this.currentDate.events.forEach(function(event) {
					event.currentlySelected = false;
				});
				
				this.$store.dispatch('setSelectedEvent', event);
			}
		}
	}
	
</script>