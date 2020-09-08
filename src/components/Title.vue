<template>
	<h1 class="name">
		<a href="/">
			<span class="text-wrapper">
				<span class="line line1"></span>
				<span class="letters">John Russell Strauss</span>
			</span>
		</a>
	</h1>
</template>

<script>
	
	import anime from 'animejs';
	
	export default {
		
		name: 'Title',

		components: {},

		data() {
			return {};
		},

		methods: {
			
			triggerTitleAnimation: function() {
				
				anime.timeline({ loop: false })
				.add({
					targets: '.name .line',
					scaleY: [0,1],
					opacity: [0.5,1],
					easing: 'easeOutExpo',
					duration: 600,
					delay: 1000
				})
				.add({
					targets: '.name .line',
					translateX: [0, document.querySelector('.name .letters').getBoundingClientRect().width + 10],
					easing: 'cubicBezier(0.860, 0.000, 0.070, 1.000)',
					duration: 800
				}).add({
					targets: '.name .letter',
					opacity: [0, 1],
					duration: 300,
					delay: (el, i) => (14 * (i))
				}, '-=500').add({
					targets: '.name .line',
					opacity: 0,
					duration: 600,
					easing: 'easeOutExpo',
					delay: 600
				});
			}
		},

		mounted: function () {
			
			var textWrapper = document.querySelector('.name .letters');
			textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"); // Wrap every letter in a span

			if (this.$route.path === '/') {
				this.triggerTitleAnimation();
			}
		},
	};
</script>

<style lang="scss">

	.name {
		@include headingFont;
		position: relative;
		margin-bottom: 100px;
		margin-top: 20px;
		margin-bottom: 50px;
		line-height: 1.25;
		
		a {
			font-size: 40px;
			color: black;
		
			.text-wrapper {
				position: relative;
				display: inline-block;
				padding-top: 0.1em;
				padding-right: 0.05em;
				padding-bottom: 0.15em;

				.line {
					opacity: 0;
					position: absolute;
					left: 0;
					height: 100%;
					width: 1px;
					background-color: black;
					transform-origin: 0 50%;
				}

				.line1 { 
					top: 0; 
					left: 0;
				}

				.letter {
					display: inline-block;
					line-height: 1em;
				}
			}
		}
	}
	
</style>