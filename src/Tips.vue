<template>
    <div>
		<BasicMap></BasicMap>
		<div class="tips">
			<div class="container">
				<a href="/" class="back-link"><img class="cta left" src="/img/arrow-green.svg"> Back to Map</a>
				<h1>Tips for Starting a Garden</h1>
				
				<section>
					<h2>Dirt</h2>
					<p>Add organic matter such as compost, manure, shredded bark or leaves. Your natural soil does not have enough resources to grow good crops, so mix in any composted organic materials in the area. Find something to loosen the soil so that you squeeze it with your hands but it does not remain compressed together firmly upon release so that the roots will have access to air over time.</p>
					
					<h2>Water</h2>
					<p>Don't let the garden dry out for extended durations and don't water if the soil is already soggy. Automated sprinklers help in dry summer months.</p>
				</section>
				
				<section>
					<h2>Resources</h2>
					
					<h4>Sunlight</h4>
					<p>Sunlight is a plant's most important resource to grow. A spot with 6-8 hours of direct sun rays is enough to start your garden.</p>
					
					<h4>Nutrients</h4>
					<p>Fertilzer: N-P-K:Nitrogen-Phosphurus-Potassium</p>
					<ul>
						<li>Nitrogen: vegetative growth</li>
						<li>Phosphorus: used in photosynthesis; important for early root growth and flowering</li>
						<li>Potassium: important for photosynthesis, fruit formation, and disease resistance.</li>
					</ul>
					<p>A good generic recommendation is a fertilizer with all three numbers between 4 and 6, such as 5-5-5, added at planting time.</p>
				</section>
				
				<section>
					<h2>Grow what you like!</h2>
					<p>Choose things to grow that you like to eat!</p>
					
					<h2>Spend time in the garden</h2>
					<p>Spending 5-10 minutes in the garden every day will help you maintain and notice problems and fix them before they become irreversible.</p>
				</section>
				
				<section>
					<h2>Recommended Reading</h2>
					
					<ul>
						<li><a href="https://www.seattleurbanfarmco.com/shop/e0zbt69dlq8sqpsb255r70k67la44j">Food Grown Right, in Your Backyard - Colin McCrate &amp; Brad Halm</a></li>
						<li><a href="https://books.google.com/books/about/The_New_Organic_Grower.html?id=zmJVlBrLtO8C">The New Organic Grower: A Master's Manual of Tools and Techniques for the Home and Market Gardener - Eliot Coleman</a></li>
					</ul>
				</section>
			</div>
		</div>
    </div>
</template>

<script>

	import BasicMap from './components/BasicMap.vue';

	export default {
		
		name: 'Tips',
		
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

	.tips {
		@include translucent-background;
		
		.back-link { 
			margin-bottom: 40px;
			display: block;
		}
		
		ul {
			margin-bottom: 20px;
		}
	}
</style>