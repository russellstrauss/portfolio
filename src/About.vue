<template>
	<div class="about">
		<Title></Title>
		<div class="layout-wrapper">
			<Nav></Nav>
			
			<div class="main-content">
				<div class="entry-content">
					<img class="margin-bottom-small" src="http://portfolio.jrstrauss.net/wp-content/uploads/2012/11/18836002_10158751264295627_1623195461480925977_n.jpg" alt="18836002_10158751264295627_1623195461480925977_n">

					<p>I was born and raised in Atlanta. My interests include mountaineering, growing my own food, cooking, art, music, home brewing, knitting, digital media, and many others. I am a maker at heart and feel most at peace when I am creating. I have spent my time in the industry learning about every aspect of the web and continually developing my technical skills that allow me to create great web experiences. I am currently getting my Master’s degree in Computer Science in the field of Computer Graphics at the Georgia Institute of Technology.</p>

					<img src="http://portfolio.jrstrauss.net/wp-content/uploads/2012/11/South-Sister-Oregon.jpg" alt="South Sister Oregon summit">
					<p class="caption">South Sister summit in Oregon, 10,358 ft.</p>				
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	import Title from './components/Title.vue';
	import Nav from './components/Nav.vue';

	export default {
		
		name: 'About',
		
		components: {
			Nav,
			Title
		},
		
		data() {
			return {}
		},
		
		methods: {}
	}
</script>

<style lang="scss">
	
	.about {
		
	}
	
</style>