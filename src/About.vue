<template>
	<div>
		<BasicMap></BasicMap>
		<div class="about">
			<div class="container">
				
				<a href="/" class="back-link"><img class="cta left" src="/img/arrow-green.svg"> Back to Map</a>
				
				<h1>About</h1>
				
				<p>Growasis is an application developed at the Georgia Institute of Technology that aims to improve the distribution of nutrient-dense foods.</p>
				
				<p>
					While there have been many technological innovations related to agricultural improvements, few have explored the inherent difficulties in food and crop distribution. Nutrient dense produce begins to deteriorate as soon as it is harvested from the farm. Foods from tropical regions travel long distances to consumers during colder seasons. Time-sensitive produce is often thrown out merely because it could not find a home in time. Gardeners experience crop-specific surpluses at certain times throughout the season when that crop produces more than the gardener is able to consume. Gardeners may share this bounty with friends and family, but otherwise lack knowledge of how to efficiently share their surplus. Our project seeks to narrow this gap by developing crowd-sourced improvements to food distribution by providing visibility to crop and garden resources.
				</p>
				
				<p>	
					Many times, knowledge is the weak link in food distribution issues. A grocer may throw out produce because he expected greater demand. A farmer may discard or compost crops he is unable to sell because he is unaware of a better use. Some consumers desire more nutrient-dense foods but are unaware of the options in their area. By creating an interface for this type of data, we provide relief to these stress points that will encourage a distributed system originating at the grass roots. Our high-level objectives to achieve this involve:
				</p>

				<ol>
					<li>Connecting consumers more directly to farms and produce markets</li>
					<li>Connecting gardeners to other gardeners for seed, expertise, or harvest surplus exchange</li>
					<li>Connecting in-need community members to local community gardens and surplus</li>
					<li>Helping community members discover food sources in their area</li>
				</ol>
			</div>
		</div>
	</div>
</template>

<script>

	import BasicMap from './components/BasicMap.vue';

	export default {
		
		name: 'About',
		
		components: {
			BasicMap
		},
		
		data() {
			return {}
		},
		
		methods: {}
	}
</script>

<style lang="scss">
	
	.about {
		@include translucent-background;
	}
</style>