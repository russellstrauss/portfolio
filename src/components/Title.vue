<template>
	<h1 class="name">
		<a href="/" @click.prevent="navigateHome">
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
			
			navigateHome: function() {
				if (this.$router) {
					this.$router.push('/');
				}
			},
			
			triggerTitleAnimation: function() {
				// Only animate if we're on the home page
				if (this.$route && this.$route.path !== '/') {
					return;
				}
				
				// Ensure line is properly hidden before animation starts
				const line = document.querySelector('.name .line');
				if (line) {
					line.style.visibility = 'visible';
					line.style.opacity = '0';
					line.style.transform = 'translateZ(0) scaleY(0)';
				}
				
				// Wait for fonts and stylesheets to load before calculating layout
				const startAnimation = () => {
					// Double-check we're still on home page before starting animation
					if (this.$route && this.$route.path !== '/') {
						this.resetTitle();
						return;
					}
					
					// Use requestAnimationFrame to ensure layout is ready
					requestAnimationFrame(() => {
						// Triple-check we're still on home page
						if (this.$route && this.$route.path !== '/') {
							this.resetTitle();
							return;
						}
						
						const lettersElement = document.querySelector('.name .letters');
						if (!lettersElement) return;
						
						// Calculate width once after fonts/stylesheets are loaded
						const lettersWidth = lettersElement.getBoundingClientRect().width + 10;
						
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
							translateX: [0, lettersWidth],
							easing: 'cubicBezier(0.860, 0.000, 0.070, 1.000)',
							duration: 800
						}).add({
							targets: '.name .letter',
							opacity: [0, 1],
							duration: 400,
							delay: (el, i) => (20 * (i)),
							easing: 'easeOutQuad'
						}, '-=500').add({
							targets: '.name .line',
							opacity: 0,
							duration: 600,
							easing: 'easeOutExpo',
							delay: 600
						});
					});
				};
				
				// Wait for fonts to load if document.fonts is available
				if (document.fonts && document.fonts.ready) {
					document.fonts.ready.then(() => {
						// Additional small delay to ensure stylesheets are applied
						requestAnimationFrame(() => {
							setTimeout(startAnimation, 50);
						});
					});
				} else {
					// Fallback: wait a bit for stylesheets to load
					requestAnimationFrame(() => {
						setTimeout(startAnimation, 200);
					});
				}
			},
			
			resetTitle: function() {
				// Reset letters to visible state on non-home pages
				const letters = document.querySelectorAll('.name .letter');
				letters.forEach(letter => {
					letter.style.opacity = '1';
				});
				// Reset line - hide it completely
				const line = document.querySelector('.name .line');
				if (line) {
					line.style.opacity = '0';
					line.style.visibility = 'hidden';
					line.style.transform = 'translateZ(0) scaleY(0)';
				}
			},
			
			initializeTitle: function() {
				var textWrapper = document.querySelector('.name .letters');
				if (textWrapper && !textWrapper.querySelector('.letter')) {
					textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"); // Wrap every letter in a span
					// Set initial opacity to 0 for all letters
					const letters = textWrapper.querySelectorAll('.letter');
					letters.forEach(letter => {
						letter.style.opacity = '0';
					});
				}
			}
		},

		mounted: function () {
			this.initializeTitle();
			
			// Use nextTick to ensure DOM is ready
			this.$nextTick(() => {
				if (this.$route.path === '/') {
					this.triggerTitleAnimation();
				} else {
					this.resetTitle();
				}
			});
		},
		
		watch: {
			'$route': {
				handler(to, from) {
					// Only initialize once - don't re-wrap letters on every route change
					if (!document.querySelector('.name .letter')) {
						this.initializeTitle();
					}
					
					// Use nextTick to ensure DOM updates are complete
					this.$nextTick(() => {
						if (to.path === '/') {
							// Only animate when navigating TO home page
							// Reset before animating
							const letters = document.querySelectorAll('.name .letter');
							letters.forEach(letter => {
								letter.style.opacity = '0';
							});
							const line = document.querySelector('.name .line');
							if (line) {
								line.style.opacity = '0';
								line.style.visibility = 'hidden';
								line.style.transform = 'translateZ(0) scaleY(0)';
							}
							
							// Small delay to ensure reset is applied
							setTimeout(() => {
								this.triggerTitleAnimation();
							}, 50);
						} else {
							// On non-home pages, immediately show title without animation
							this.resetTitle();
						}
					});
				},
				immediate: false
			}
		},
	};
</script>

<style lang="scss">

	.name {
		@include heading-font;
		position: relative;
		margin-bottom: 100px;
		margin-top: 20px;
		margin-bottom: 50px;
		line-height: 1.25;
		
		
		a {
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
					background-color: white;
					transform-origin: 0 50%;
					will-change: transform, opacity;
					transform: translateZ(0) scaleY(0); /* Force hardware acceleration and keep hidden */
					visibility: hidden; /* Hide until animation starts */
				}

				.line1 { 
					top: 0; 
					left: 0;
				}

				.letter {
					display: inline-block;
					line-height: 1em;
					will-change: opacity;
					transform: translateZ(0); /* Force hardware acceleration */
				}
			}
		}
	}
	
</style>