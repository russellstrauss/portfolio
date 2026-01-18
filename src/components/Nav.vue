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
				titleFadeInLength: 3680,
				menuFadeInDelay: 500,
				previousRoute: null,
				
				nav: [
					{
						title: 'About',
						path: '/about'
					},
					{
						title: 'Work',
						path: '/work'
					}//,
					// {
					// 	title: 'Resume',
					// 	path: '/resume'
					// }
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
				
				const currentPath = this.$route.path;
				const isWorkRoute = currentPath === '/work' || currentPath.startsWith('/work/');
				const wasWorkRoute = this.previousRoute && (this.previousRoute === '/work' || this.previousRoute.startsWith('/work/'));
				
				if (isWorkRoute && wasWorkRoute) return; // If navigating between work routes, don't re-animate - just ensure nav stays visible
				
				$('nav.main ul li a span').css({
					'margin-left': '',
					'opacity': '',
					'transform': ''
				});
				
				$('nav.main ul li a').each(function() { // Re-wrap characters if needed
					var $link = $(this);
					if ($link.find('span').length === 0 || $link.text().trim() !== $link.find('span').text().replace(/\s/g, '')) {
						self.wrapCharacters($link, 'span');
					}
				});

				if (this.$route.path === '/') {
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
					$('nav.main ul li a span').css({'margin-left': 0, 'opacity': 1, 'transform': 'none'});
				}
			}
		},
		
		mounted: function () {
			this.previousRoute = this.$route ? this.$route.path : null;
			this.animateNav();
		},
		
		watch: {
			'$route'(to, from) {
				this.previousRoute = from ? from.path : null;
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
		line-height: 1.25

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
						
						&:hover {
							color: $hover-color;
						}
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
						transform: translate(50px, 50px) scale(0) rotate(0deg);
						opacity: 0;
						transition: transform 500ms cubic-bezier(0.645, 0.045, 0.355, 1), opacity 250ms ease-out;
					}
				}
			}
		}
	}
</style>