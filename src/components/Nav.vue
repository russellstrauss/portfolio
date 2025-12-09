<template>
	<nav class="main">
		<div class="menu-main-container">
			<ul id="menu-main" class="menu">
				<li class="menu-item" v-for="menuItem in nav" :key="menuItem.path">
					<a :href="menuItem.path" @click.prevent="navigate(menuItem.path)">{{ menuItem.title }}</a>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
	
	import Title from './Title.vue';
	
	export default {
		name: 'Nav',

		components: {
			Title
		},

		data() {
			return {
				// Updated to match actual title animation timing (from when animation starts):
				// Line scale: delay 1000ms + duration 600ms = ends at 1600ms
				// Line translate: starts at 1600ms, duration 800ms = ends at 2400ms  
				// Letters start at 1900ms (2400 - 500), with staggered delays
				// For "John Russell Strauss" (~20 chars): last letter starts at 1900 + (19 * 20) = 2280ms
				// Last letter duration: 400ms, so letters finish at ~2680ms
				// Total from animation start: 1000ms delay + 2680ms = 3680ms
				titleFadeInLength: 3680,
				menuFadeInDelay: 500,
				
				nav: [
					{
						title: 'About',
						path: '/about'
					},
					{
						title: 'Work',
						path: '/work'
					},
					{
						title: 'Resume',
						path: '/resume'
					}
				]
			};
		},

		methods: {
			
			navigate: function(path) {
				if (this.$router) {
					this.$router.push(path);
				}
			},
			
			wrapCharacters: function(element, elementType, className) {
				className = className || undefined;
				elementType = elementType || undefined;
				
				var el = $(element);
				var regExp;
								
				if (elementType === undefined) {
					regExp = '<span>$&</span>';
				}
				else if (className === undefined) {
					regExp = '<' + elementType + '>$&</' + elementType + '>';
				}
				else {
					regExp = '<' + elementType + ' class="' + className + '">$&</' + elementType + '>';
				}
				el.html(function(index, html) {
					return html.replace(/\S/g, regExp);
				});
			},
			
			animateNav: function() {
				let self = this;
				
				// Reset animation state
				$('nav.main ul li a span').css({
					'margin-left': '',
					'opacity': '',
					'transform': ''
				});
				
				// Re-wrap characters if needed
				$('nav.main ul li a').each(function() {
					var $link = $(this);
					if ($link.find('span').length === 0 || $link.text().trim() !== $link.find('span').text().replace(/\s/g, '')) {
						self.wrapCharacters($link, 'span');
					}
				});

				// Apply animation if on landing page
				if (this.$route.path === '/') {
					// Wait for fonts to load (same as Title component) before calculating delay
					const calculateDelay = () => {
						// Title animation timing (titleFadeInLength already includes the 1000ms delay):
						// - Font loading: already waited
						// - Title animation total: titleFadeInLength (3680ms, includes 1000ms delay + 2680ms animation)
						// - Menu delay: 500ms
						const totalDelay = self.titleFadeInLength + self.menuFadeInDelay;
						
						$('nav.main ul li a span').each(function(i) {
							var $letter = $(this);
							
							setTimeout(function() {
								$letter.css({'margin-left': 0, 'opacity': 1, 'transform': 'none'});
							}, (i * 60) + totalDelay);
						});
					};
					
					// Wait for fonts to load if available (same as Title component)
					if (document.fonts && document.fonts.ready) {
						document.fonts.ready.then(() => {
							requestAnimationFrame(() => {
								setTimeout(calculateDelay, 50);
							});
						});
					} else {
						requestAnimationFrame(() => {
							setTimeout(calculateDelay, 200);
						});
					}
				} else {
					// On other pages, show immediately
					$('nav.main ul li a span').css({'margin-left': 0, 'opacity': 1, 'transform': 'none'});
				}
			}
		},
		
		mounted: function () {
			this.animateNav();
		},
		
		watch: {
			'$route'(to, from) {
				this.animateNav();
			}
		},
	};
</script>

<style lang="scss">

	.name {
		@include heading-font;
		margin-top: 20px;
		margin-bottom: 50px;
		line-height: 1.25;
		
		a {
			text-decoration: none;
		}
	}

	nav.main {
		margin-bottom: 50px;
		
		@include mobile-only {
			margin-bottom: 100px;
		}
		
		.menu-main-container {
			
			ul {
				list-style-type: none;
				
				li {
					@include heading-font;
					margin-bottom: 20px;
					margin-left: 0;
					
					a {
						display: inline-block;
						text-decoration: none;
					}

					span {
						display: inline-block;
					}
				}
			}
		}
	}

	.landing {
		
		nav.main {
			ul {
				li {
					span {
						transform: translate(150px, 0) scale(0) rotate(60deg);
						opacity: 0;
						transition: transform 500ms ease-in-out, opacity 50ms ease-out;
					}
				}
			}
		}
	}
</style>