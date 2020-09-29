<template>
	<nav class="main">
		<div class="menu-main-container">
			<ul id="menu-main" class="menu">
				<li class="menu-item" v-for="menuItem in nav" :key="menuItem.path">
					<a :href="menuItem.path">{{ menuItem.title }}</a>
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
				titleFadeInLength: 1800,
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
			}
		},

		mounted: function () {
			
			let self = this;
			
			$('nav.main ul li a').each(function() {

				var $link = $(this);

				self.wrapCharacters($link, 'span');
			});

			$('nav.main ul li a span').each(function(i) {
				var $letter = $(this);
				
				setTimeout(function() {
					$letter.css({'margin-left': 0, 'opacity': 1, 'transform': 'none'});

				}, (i * 60) + (self.titleFadeInLength + self.menuFadeInDelay));
			});
		},
	};
</script>

<style lang="scss">

	.name {
		@include heading-font;
		margin-top: 20px;
		margin-bottom: 50px;
		line-height: 1.25;
		
		@include mobile-only {
			font-size: 24px;
		}
		
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
					line-height: 1;
					
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