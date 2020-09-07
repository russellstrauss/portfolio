<template>
	<div>
		<div class="name">
			<a class="swipe" href="/">John Russell Strauss</a>
		</div>

		<div class="layout-wrapper">
			<nav class="main">
				<div class="menu-main-container">
					<ul id="menu-main" class="menu">
						<li class="menu-item" v-for="menuItem in nav" :key="menuItem.path">
							<a :href="menuItem.path">{{ menuItem.title }}</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	</div>
</template>

<script>
	
	export default {
		name: "Nav",

		components: {},

		data() {
			return {
				titleFadeInLength: 1800,
				menuFadeInDelay: 300,
				
				nav: [
					{
						title: "About",
						path: "/about"
					},
					{
						title: "Work",
						path: "/work"
					},
					{
						title: "Resume",
						path: "/resume"
					},
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

			$('.name a').addClass('active');

			$('nav.main ul li a span').each(function(i) {
				var $letter = $(this);
				
				setTimeout(function() {
					$letter.css({'margin-left': 0, 'opacity': 1, 'transform': 'none'});

				}, (i * 50) + (self.titleFadeInLength + self.menuFadeInDelay));
			});
			
			// Animate name in
			var $name = $(".name a span");
			$name.each(function (i) {
				var $letter = $(this);
				var fadeInInterval = 100;

				setTimeout(function () {
					$letter.css({
						"margin-left": "0",
						opacity: "1",
						transform: "rotate(0deg)",
					});
				}, i * fadeInInterval);

				setTimeout(function () {
					fadeInMenu();
				}, $name.length * fadeInInterval + 800);
			});

			var fadeInMenu = function () {
				var $menu = $(".menu-main-container ul li");
				var fadeInInterval = 200;

				$menu.each(function (i) {
					var $menuItem = $(this);
					
					console.log($menuItem);
					
					setTimeout(function () {
						$menuItem.css({ "margin-left": "0", opacity: "1" });
					}, i * fadeInInterval);
				});

				setTimeout(function () {
					fadeInWireframe();
				}, $menu.length * fadeInInterval + 800);
			};
			// var fadeInWireframe = function () {
			// 	$("#sphereWireframe").css("opacity", "1");
			// };
		},
	};
</script>

<style lang="scss">

	.name {
		@include headingFont;
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
		@include headingFont;
		margin-bottom: 50px;
		
		.menu-main-container {
			
			ul {
				list-style-type: none;
				
				li {
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

	// animations on the front page
	.front-page {
		
		@keyframes swipe-animation {
			0% {
				transform-origin: left;
				transform: scaleX(0);
			}
			50% {
				transform-origin: left;
				transform: scaleX(1);
			}
			51%{
				transform-origin: right;
			}
			100% {
				transform-origin: right;
				transform: scaleX(0);
			}
		}

		.swipe {
			display: inline-block;
			position: relative;
			background: -webkit-linear-gradient(0deg, $link-color 50%, transparent 50%);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-position: 100% 0;
			background-size: 200% 100%;
			transition: 0.6s all cubic-bezier(0.860, 0.000, 0.070, 1.000) 0.8s;

			&:before {
				content: "";
				height: 100%;
				width: 100%;
				background: #eaeaea;
				z-index: 2;
				display: block;
				position: absolute;
				top: 0;left: 0;
				transform-origin: left;
				transform: scaleX(0);
			}
			
			&:after {
				content: "";
				height: 100%;
				width: 100%;
				background: $link-color;
				z-index: 2;
				display: block;
				position: absolute;
				top: 0;left: 0;
				transform-origin: left;
				transform: scaleX(0);
			}
			
			&.active {
				background-position: 0 0;

				&:before {
					animation: swipe-animation 1.2s cubic-bezier(0.860, 0.000, 0.070, 1.000) forwards;
				}
				
				&:after {
					animation: swipe-animation 1.2s 0.5s cubic-bezier(0.860, 0.000, 0.070, 1.000) forwards;
				}
			}
		}
		
		nav.main {
			ul {
				li {
					span {
						transform: translate(80px, 50px) scale(0) rotate(-90deg);
						opacity: 0;
						transition: transform 500ms ease-in-out, opacity 100ms ease-out;
					}
				}
			}
		}
	}
</style>