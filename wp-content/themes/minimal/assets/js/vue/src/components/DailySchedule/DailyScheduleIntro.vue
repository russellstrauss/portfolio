<template>
		
	<div class="daily-schedule-intro">
		
		<h5 v-if="subtitle" class="subtitle">{{ subtitle }}</h5>
		
		<h2>{{ title }}</h2>

		<div class="body" v-if="introText" v-html="introText"></div>
		
		<div class="date-selector-and-park-hours">
			<DailyScheduleDateSelector :layout="layout" v-on:date-prev="$emit('date-prev');" v-on:date-next="$emit('date-next');"></DailyScheduleDateSelector>
		</div>
	</div>
		
</template>

<script>

	import DailyScheduleDateSelector from './DailyScheduleDateSelector.vue'

	export default {
		name: 'DailyScheduleIntro',
		
		components: {
			DailyScheduleDateSelector
		},
		
		props: ['layout', 'subtitle', 'introText', 'title', 'scheduleDisclaimer', 'dates'],
		
		computed: {
			
			currentDate: function() {
				
				return this.$store.getters.getCurrentDate;
			}
		}
	}
	
</script>