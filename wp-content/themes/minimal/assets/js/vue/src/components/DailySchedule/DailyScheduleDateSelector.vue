<template>

	<div>
		<div class="date-selector">
			<div class="daily-schedule-page-prev" v-on:click="$emit('date-prev');">
				<svg class="icon-arrow-right-thin" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15.6 28.7" xml:space="preserve">
					<path d="M1.7,0.3l13.5,13.3c0.9,0.9-0.5,2.4-1.4,1.4L0.3,1.7C-0.6,0.8,0.8-0.6,1.7,0.3z M0.3,26.9 l13.5-13.3c0.9-0.9,2.4,0.5,1.4,1.4L1.7,28.4C0.8,29.3-0.6,27.9,0.3,26.9z"/>
				</svg>
			</div>

			{{ currentDate.date | moment("dddd, MMMM Do, YYYY") }}
			
			<div class="daily-schedule-page-next" v-on:click="$emit('date-next');">
				<svg class="icon-arrow-right-thin" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 15.6 28.7" xml:space="preserve">
					<path d="M1.7,0.3l13.5,13.3c0.9,0.9-0.5,2.4-1.4,1.4L0.3,1.7C-0.6,0.8,0.8-0.6,1.7,0.3z M0.3,26.9 l13.5-13.3c0.9-0.9,2.4,0.5,1.4,1.4L1.7,28.4C0.8,29.3-0.6,27.9,0.3,26.9z"/>
				</svg>
			</div>
		</div>
		
		<div class="park-hours">
			<div class="park" v-bind:key="parkHourSection.id" v-for="parkHourSection in currentDate.parks">
				<h5>{{ parkHourSection.title }}<span v-if="layout === 'simple'"> Hours</span></h5>
				<div class="hours">{{ parkHourSection.parkOpen | moment("h:mmA") }}-{{ parkHourSection.parkClose | moment("h:mmA") }}</div>
			</div>
		</div>
		
		<div v-if="layout === 'advanced'" class="schedule-disclaimer" v-html="currentDate.scheduleDisclaimer"></div>
	</div>
	
</template>

<script>

	export default {
		name: 'DailyScheduleDateSelector',
		
		props: ['layout'],
		
		computed: {
			
			currentDate: function() {
				
				return this.$store.getters.getCurrentDate;
			}
		}
	}
	
</script>