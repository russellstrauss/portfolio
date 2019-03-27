<template>
	
	<div class="event-details">
		<img class="event-photo" v-if="selectedEvent.eventPhoto" v-bind:src="selectedEvent.eventPhoto" />
		
		<div class="event-name-and-time">
			
			<h4>
				{{ selectedEvent.eventName }}
			</h4>
			<div class="event-time">
				{{ selectedEvent.startTime | moment("h:mm") }} - {{ selectedEvent.endTime | moment("h:mm A") }}
			</div>
		</div>
		
		<ul class="alternative-times" v-if="selectedEvent.allStartTimes">
			<li>When</li>
			<li v-bind:key="time.startTime" v-for="time in selectedEvent.allStartTimes">{{ time.startTime | moment("hh:mmA") }}</li>
		</ul>
		
		<div class="event-description">
			{{ selectedEvent.description }}
		</div>
		
		<a class="event-details-page-link" v-bind:href="selectedEvent.eventLinkPath">
			{{ selectedEvent.eventLinkText }}
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 9 15">
				<path d="M1.5,15c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l4.9-4.9L0.4,2.6C-0.1,2-0.1,1,0.4,0.4C1-0.1,2-0.1,2.6,0.4l6,6 C9.1,7,9.1,8,8.6,8.6l-6,6C2.3,14.8,1.9,15,1.5,15z"/>
			</svg>
		</a>
		
	</div>
	
</template>

<script>

	export default {
		name: 'DailyScheduleEventDetails',
		
		computed: {
			
			currentDate: function() {
				
				return this.$store.getters.getCurrentDate;
			},
			
			selectedEvent : function() {
				
				return this.$store.getters.getSelectedEvent;
			}
		}
	}
	
</script>