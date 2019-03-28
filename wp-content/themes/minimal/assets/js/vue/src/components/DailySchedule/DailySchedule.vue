<template>

	<div class="daily-schedule container" v-bind:class="'layout-' + layout"> <!-- layout variable can be "simple" or "advanced" -->
		
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
				
				if (!this.mobile() || this.layout === "simple") { // don't set default event when using mobile accordions (advanced layout on mobile)
					
					let defaultEventDisplay = this.sortEvents(this.currentDate.events).find(function(event) {
						return event.featured;
					});
					
					if (!defaultEventDisplay) { // if no featured events, just select the first one
						defaultEventDisplay = this.sortEvents(this.currentDate.events)[0];
					}
					
					this.$store.dispatch('setSelectedEvent', defaultEventDisplay);
				}
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
			},
			
			mobile: function() {
				return window.innerWidth < 768;
			}
		}
	}
	
</script>

<style lang="scss">

	$dw-peach: #cb6e52;
	$dw-blue: #4374A6;
	$daily-schedule-date-selector-color: $dw-blue;
	$daily-schedule-subtitle-color: $dw-peach;
	$daily-schedule-color-primary: $dw-blue;
	$daily-schedule-color-secondary: #cb6e52;
	$daily-schedule-timestamp-font-family: 'Baskerville';
	$daily-schedule-timestamp-color: #7B7B7B;
	$daily-schedule-active-title-color: black;
	$daily-schedule-active-location-color: $dw-blue;
	$daily-schedule-arrow-color: $dw-blue;

	$global-link-color: $dw-blue;
	$global-button-alternative: $dw-peach;
	$global-shadow: 0 0 26px 0 rgba(0, 0, 0, 0.3);

	$mobile-width: 767px;
	$tablet-width: 768px;
	$desktop-width: 992px;
	$desktop-large-width: 1200px;

	// Target mobile-only (767px and below)
	@mixin mobile-only {
		@media (max-width: #{$mobile-width}) {
			@content;
		}
	}

	// Target tablet and above (768px+)
	@mixin tablet {
		@media (min-width: #{$tablet-width}) {
			@content;
		}
	}

	// Target only tablet (768 - 991px)
	@mixin tablet-only {
		@media (min-width: #{$tablet-width}) and (max-width: #{$desktop-width - 1px}) {
			@content;
		}
	}

	// Target desktop and above (992px+)
	@mixin desktop {
		@media (min-width: #{$desktop-width}) {
			@content;
		}
	}

	@mixin desktop-small-only {
		@media (min-width: #{$desktop-width}) and (max-width: #{$desktop-large-width - 1px}) {
			@content;
		}
	}

	// Target desktop-large and above (1200px+)
	@mixin desktop-large {
		@media (min-width: #{$desktop-large-width}) {
			@content;
		}
	}

	@mixin ie-only {
		@media all and (-ms-high-contrast: none) {
			@content;
		}
	}

	// Fonts
	@mixin baskerville {
		font-family: 'Libre Baskerville', serif;
		font-weight: 400;
	}

	@mixin baskerville-bold {
		font-family: 'Libre Baskerville', serif;
		font-weight: 700;
	}

	@mixin oswald {
		font-family: 'Oswald', sans-serif;
		font-weight: 500;
		letter-spacing: 1.5px;
	}

	@mixin montserrat {
		font-family: 'Montserrat', sans-serif;
		font-weight: 400;
		letter-spacing: 1.5px;
	}

	@mixin montserrat-semibold {
		font-family: 'Montserrat', sans-serif;
		font-weight: 700;
		letter-spacing: 1.5px;
	}

	@mixin montserrat-bold {
		font-family: 'Montserrat', sans-serif;
		font-weight: 700;
		letter-spacing: 1.5px;
	}

	@mixin set-font($font) {
		
		@if ($font == 'Montserrat') {
			@include montserrat;
		}
		@else if ($font == 'Montserrat Semibold') {
			@include montserrat-semibold;
		}
		@else if ($font == 'Montserrat Bold') {
			@include montserrat-bold;
		}
		@else if ($font == 'Oswald') {
			@include oswald;
		}
		@else if ($font == 'Baskerville') {
			@include baskerville;
		}
		@else if ($font == 'Baskerville Bold') {
			@include baskerville-bold;
		}
	}

	@mixin subtitle($color: $color-fountain-blue) {
		@include montserrat-bold;
		color: $color;
		text-transform: uppercase;
		letter-spacing: 1.5px;
		font-size: 10px;
		
	}

	@mixin horizontal-rule($color) {
		
		&:after {
			content: '';
			border-bottom: 2px solid $color;
			width: 60px;
			display: block;
			margin: 20px auto;
		}
	}

	@mixin global-arrow-callout {
		@include montserrat-semibold;
		text-transform: uppercase;
		color: $global-link-color;
		
		display: flex;
		align-items: center;
		justify-content: center;
		
		svg {
			width: .4em;
			fill: $global-link-color;
			margin-left: 5px;
			
			@include ie-only {
				max-height: 1em;
			}
		}
	}

	@mixin disable-highlight {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.daily-schedule {
		@include disable-highlight;
		margin-top: 40px;
		margin-bottom: 100px;
		
		&.layout-simple {
			
			.daily-schedule-intro {
				
				.date-selector-and-park-hours {
					margin-bottom: 20px;
					
					.date-selector {
						font-size: 14px;
					}
					
					.park-hours {
						margin: 15px 0 5px 0;
						padding: 0;
						border: 0;
						
						@include mobile-only {
							display: block;
						}
						
						.park {
							
							h5 {
								@include set-font('Montserrat Semibold');
								font-size: 10px;
								display: inline-block;
								margin-right: 5px;
								margin-bottom: 0;
								text-transform: uppercase;
							}
							
							.hours {
								@include set-font('Montserrat Semibold');
								font-size: 10px;
								text-transform: uppercase;
								display: inline-block;
							}
						}
					}
				}
			}
			
			.daily-schedule-event-listing {
				
				.event-list {
					
					@include tablet {
						border-right: 1px solid #D7D7D7;
						padding-right: 15px;
						margin-right: 15px;
					}
					
					.events {
						
						ul {
							
							li {
								
								@include mobile-only {
									padding-right: 0;
								}
								
								@include tablet {
									padding-right: 15px;
								}
								
								&:last-of-type {
									border-bottom: 1px solid #D7D7D7;
								}
							}
						}
					}
				}
			}
		}
		
		&.layout-advanced {
			
			.daily-schedule-event-listing {
				
				@include mobile-only {
					flex-direction: column-reverse;
				}
				
				>.event-details {
					
					@include mobile-only {
						display: none;
					}
				}
				
				.event-list .events {
					
					>ul {
					
						>li {
							
							@include mobile-only {
								padding: 20px 0;
								text-align: center;
							}
							
							&:first-of-type {
								border-top: 0;
							}
							
							&.active {
								
								.event-cta-arrow {
									
									@include mobile-only {
										position: static;
										width: 15px;
										transform: translate(0, 50%) rotate(270deg);
									}
								}
								
								.event-details {
									
									@include mobile-only {
										display: block;
									}
								}
							}
							
							.event-details {
								margin-top: 20px;
								display: none;
							}
							
							
							.time {
								
								@include mobile-only {
									width: 100%;
									max-width: 100%;
								}
							}
							
							.event-cta-arrow {
								
								@include mobile-only {
									position: static;
									width: 15px;
									transform: translate(0, 50%) rotate(90deg);
									transition: transform 250ms ease;
								}
							}
						}
					}
				}
			}
		}
		
		.daily-schedule-intro {
			display: block;
			margin: auto;
			
			@include desktop {
				width: 75%;
			}
			
			.subtitle {
				@include subtitle($daily-schedule-subtitle-color);
				margin-bottom: 10px;
				text-align: center;
			}
			
			h2 {
				@include horizontal-rule($daily-schedule-color-primary);
				@include set-font('Baskerville');
				color: black;
				text-align: center;
				font-size: 44px;
			}
			
			.date-selector {
				@include set-font('Montserrat');
				text-align: center;
				font-size: 18px;
				list-style-type: none;
				padding: 0;
				color: $daily-schedule-date-selector-color;
				display: flex;
				margin: auto;
				justify-content: center;
				align-items: center;
				
				@include mobile-only {
					font-size: 18px;
				}
				
				.daily-schedule-page-prev, .daily-schedule-page-next {
					padding: 0 10px;
					display: flex;
					align-items: center;
					cursor: pointer;
					
					&.daily-schedule-page-prev {
						
						@include mobile-only {
							padding-left: 0;
						}
						
						svg {
							transform: rotate(180deg);
							
							@include mobile-only {
								margin-left: 0;
							}
						}
					}
					
					&.daily-schedule-page-next {
						
						@include mobile-only {
							padding-right: 0;
						}
						
						svg {
							
							@include mobile-only {
								margin-right: 0;
							}
						}
					}
					
					svg {
						fill: $daily-schedule-date-selector-color;
						width: 12px;
						margin: 0 10px;
					}
				}
			}
			
			.park-hours {
				display: flex;
				margin-top: 30px;
				flex-wrap: wrap;
				border-bottom: 1px solid #979797;
				padding-bottom: 30px;
				margin-bottom: 30px;
				
				@include mobile-only {
					padding-bottom: 15px;
					margin-bottom: 15px;
				}
				
				.park {
					margin: auto;
					text-align: center;
					
					h5 {
						
						@include mobile-only {
							font-size: 16px;
							margin-bottom: 5px;
						}
					}
					
					.hours {
						@include set-font('Montserrat Semibold');
						font-size: 14px;
						
						@include mobile-only {
							font-size: 12px;
						}
					}
				}
			}
		}
		
		.schedule-disclaimer {
			color: #4d4d4d;
			line-height: 1.6;
			text-align: center;
			font-size: .9em;
			
			@include tablet {
				padding: 0 30px;
			}
			
			a {
				@include global-arrow-callout;
				font-size: 12px;
			}
		}
		
		.sorting-selector {
			@include montserrat-bold;
			text-transform: uppercase;
			font-size: 14px;
			letter-spacing: 1px;
			border-bottom: 1px solid #979797;
			padding-bottom: 15px;
			margin-bottom: 10px;
			margin-top: 50px;
			
			@include mobile-only {
				overflow: visible;
				font-size: 12px;
			}
			
			@include tablet-only {
				font-size: 11px;
			}
			
			@include tablet {
				display: flex;
				justify-content: space-between;
			}
			
			.sort-by {
				margin: 0;
				padding: 0;
				list-style-type: none;
				display: flex;
				justify-content: center;
				width: 100%;
				
				li {
					margin: 0 30px 0 0;
					padding-bottom: 3px;
					color: #9b9b9b;
					
					@include mobile-only {
						width: auto;
					}
					
					@include tablet {
						width: auto;
						height: auto;
						position: static;
						flex-shrink: unset;
					}
					
					&:hover {
						color: black;
						cursor: pointer;
					}
					
					&.active {
						color: black;
						border-bottom: 3px solid $global-button-alternative;
					}
				}
			}
		}
		
		.park-filter {
			border-bottom: 1px solid #979797;
			padding-bottom: 10px;
			margin-bottom: 20px;
			position: relative;
			
			@include mobile-only {
				border-bottom: 0;
			}
			
			@include tablet {
				display: flex;
				justify-content: flex-end;
			}
			
			.filter-dropdown {
				@include set-font('Montserrat Semibold');
				cursor: pointer;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 14px;
				
				@include mobile-only {
					font-size: 12px;
					position: relative;
				}
				
				@include tablet-only {
					font-size: 11px;
				}
				
				@include tablet {
					margin-left: 20px;
				}
				
				@include desktop {
					position: relative;
				}
				
				.current-sort {
					@include set-font('Montserrat');
				}
				
				.dropdown-options {
					display: none;
					position: absolute;
					z-index: 99999;
					background-color: white;
					box-shadow: $global-shadow;
					right: 0;
					top: 100%;
					
					@include mobile-only {
						width: 100%;
					}
					
					@include desktop {
						top: calc(100% + 10px);
					}
					
					&.active {
						display: block;
					}
					
					ul {
						padding: 0;
						margin: 0;
						list-style-type: none;
						width: 180px;
						font-size: 12px;
						text-transform: none;
						
						li {
							position: relative;
							color: #4a4a4a;
							padding: 10px 20px;
							
							&.active {
								color: $daily-schedule-color-primary;
								
								&:after {
									content: '';
									width: 75%;
									border-bottom: 1px solid $daily-schedule-color-secondary;
									display: block;
									position: absolute;
									bottom: 5px;
								}
							}
							
							&:first-of-type {
								padding-top: 20px;
							}
							
							&:last-of-type {
								padding-bottom: 20px;
								
								&:after {
									bottom: 15px;
								}
							}
						}
					}
				}
				
				.park-dropdown-toggle {
					text-transform: uppercase;
					
					@include mobile-only {
						display: flex;
						justify-content: space-between;
						align-items: center;
						width: 100%;
						padding: 10px 0;
						border-bottom: 1px solid #ccc;
					}
					
					.current-filter {
						@include set-font('Montserrat');
						
						@include mobile-only {
							margin-left: auto;
						}
					}
					
					svg {
						
						@include ie-only {
							max-height: 1em;
						}
					}
					
					&.active {
						
						svg {
							transform: rotate(180deg);
						}
					}
				}
				
				svg {
					width: 15px;
					margin-left: 10px;
					transition: transform 150ms ease;
				}
			}
		}
		
		.daily-schedule-event-listing {
			display: flex;
			
			@include mobile-only {
				flex-wrap: wrap;
			}
			
			.event-list {
				
				@include mobile-only {
					width: 100%;
				}
				
				@include tablet {
					width: 50%;
					padding-right: 20px;
				}
				
				.featured-events-label, .all-events-label {
					@include set-font('Montserrat Semibold');
					color: white;
					font-size: 12px;
					padding: 5px 10px;
					text-transform: uppercase;
				}
				
				.featured-events-label {
					background-color: $daily-schedule-color-primary;
				}
				
				.all-events-label {
					background-color: $daily-schedule-color-secondary;
				}
				
				.events {
					
					>ul {
						list-style-type: none;
						padding: 0;
						margin-bottom: 0;
						
						>li {
							border-top: 1px solid #D7D7D7;
							padding: 30px 25px 30px 15px;
							position: relative;
							cursor: pointer;
							
							@include mobile-only {
								padding: 15px 0;
								
								&:last-of-type {
									border-bottom: 1px solid #D7D7D7;
								}
							}
							
							@include tablet-only {
								padding: 20px 25px 20px 15px;
							}
							
							@include tablet {
								display: flex;
								align-items: flex-start;
							}
							
							&.sort-by-activity {
								flex-direction: row-reverse;
								justify-content: space-between;
							}
							
							&:hover {
								
								.time {
									color: darken(#7B7B7B, 20%);
								}
								
								.title-and-location {
									
									h3, .location {
										color: darken(#7B7B7B, 20%);
									}
								}
							}
							
							&.active {
								
								.time {
									color: $daily-schedule-active-title-color;
								}
								
								.title-and-location {
									
									h3 {
										color: $daily-schedule-active-title-color;
									}
									
									.location {
										color: $daily-schedule-active-location-color;
									}
								}
							}
							
							.time {
								@include set-font($daily-schedule-timestamp-font-family);
								max-width: 120px;
								margin-right: 20px;
								font-size: 22px;
								color: #7B7B7B;
								
								@include mobile-only {
									display: block;
									font-size: 16px;
									margin-bottom: 5px;
								}
								
								@include tablet-only {
									font-size: 14px;
									min-width: 75px;
								}
							}
							
							.title-and-location {
								
								h3 {
									@include set-font('Baskerville');
									color: #7B7B7B;
									margin-bottom: 5px;
									font-size: 24px;
									margin-top: 0;
									
									@include mobile-only {
										font-size: 22px;
									}
									
									@include tablet-only {
										font-size: 18px;
									}
								}
								
								.location {
									@include set-font('Montserrat Semibold');
									color: #7B7B7B;
									text-transform: uppercase;
									font-size: 12px;
									
									@include tablet-only {
										font-size: 10px;
									}
								}
							}
							
							.event-cta-arrow {
								fill: $daily-schedule-arrow-color;
								width: 10px;
								height: 30px;
								position: absolute;
								right: 0;
								transform: translateY(-50%);
								top: 50%;
							}
						}
					}
				}
			}
			
			.event-details {
				
				@include mobile-only {
					width: 100%;
					margin-bottom: 20px;
				}
				
				@include tablet {
					width: 50%;
				}
				
				.event-photo {
					margin-bottom: 30px;
					
					@include tablet-only {
						margin-bottom: 20px;
					}
				}
				
				.event-name-and-time {
					text-align: left;
					margin-bottom: 20px;
					
					@include tablet {
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
					
					h4 {
						@include set-font('Baskerville');
						color: $daily-schedule-active-title-color;
						margin-bottom: 0;
						
						@include mobile-only {
							margin-bottom: 10px;
						}
						
						@include tablet-only {
							font-size: 18px;
						}
					}
					
					.event-time {
						@include set-font($daily-schedule-timestamp-font-family);
						color: $daily-schedule-active-title-color;
						
						@include mobile-only {
							margin-bottom: 20px;
						}
						
						@include tablet-only {
							font-size: 12px;
						}
					}
				}
				
				.alternative-times {
					display: flex;
					flex-wrap: wrap;
					list-style-type: none;
					padding: 0;
					border-top: 1px solid #D7D7D7;
					border-bottom: 1px solid #D7D7D7;
					font-size: 12px;
					margin-bottom: 20px;
					
					li {
						margin: 10px 20px 10px 0;
						
						@include tablet-only {
							margin: 10px 10px 0 0;
						}
						
						&:first-of-type {
							@include set-font('Montserrat Semibold');
							text-transform: uppercase;
							color: $daily-schedule-active-title-color;
						}
						
						&:last-of-type {
							margin: 10px 0;
						}
					}
				}
				
				.event-description {
					text-align: left;
					line-height: 1.5;
					
					@include tablet-only {
						font-size: 14px;
					}
				}
				
				.event-details-page-link {
					@include global-arrow-callout;
					text-align: left;
					justify-content: flex-start;
					margin-top: 20px;
					font-size: 14px;
					
					@include tablet-only {
						font-size: 12px;
					}
				}
			}
		}
	}
</style>
