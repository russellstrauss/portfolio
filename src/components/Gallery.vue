
<template>
	<div class='gallery' :class="{ 'active': active }">
		
		<Swiper class='swiper gallery-top' :options='swiperOptions' ref='swiperMain'>
			<SwiperSlide v-for="slide in slides" :key="slide.path" :style="'background-image: url(' + getImageUrl(slide.path) + ');'"></swiper-slide>
			
			<div class='swiper-button-next' slot='button-next'></div>
			<div class='swiper-button-prev' slot='button-prev'></div>
		</Swiper>
		
		<Swiper class='swiper gallery-thumbs' :options='thumbnailCarouselOptions' ref='swiperThumbs'>
			<SwiperSlide v-for="slide in slides" :key="slide.path" :style="'background-image: url(' + getImageUrl(slide.path) + ');'"></swiper-slide>
		</Swiper>
		<img :src="getImageUrl('/img/close-white.svg')" alt="" class="close" v-on:click="dismiss">
	</div>
</template>

<script>
	import { Swiper, SwiperSlide } from 'swiper/vue';
	import 'swiper/css';

	export default {
		
		name: 'Gallery',
		
		components: {
			Swiper,
			SwiperSlide
		},
		
		props: ['slides'],

		data() {
			return {
				swiperOptions: {
					loop: true,
					loopedSlides: this.slides.length,
					slidesPerView: 1,
					spaceBetween: 200,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					},
					observerUpdate: true
				},
				thumbnailCarouselOptions: {
					loop: true,
					loopedSlides: this.slides.length,
					slidesPerView: utils.mobile() ? 4 : 5,
					spaceBetween: 20,
					touchRatio: 0.2,
					slideToClickedSlide: true,
					observerUpdate: true,
					slidesOffsetBefore: 10,
					slidesOffsetAfter: 10,
					centeredSlides: true
				},
				active: false
			};
		},
		
		computed: {
			
		},
		
		methods: {
			
			getImageUrl: function(imagePath) {
				if (!imagePath) return '';
				// If the path is already absolute with base URL, return as is
				const baseUrl = import.meta.env.BASE_URL || '/';
				// If path already starts with base URL, return as is
				if (imagePath.startsWith(baseUrl)) {
					return imagePath;
				}
				// If path starts with /, prepend base URL (removing trailing slash from base if present)
				if (imagePath.startsWith('/')) {
					const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
					return normalizedBase + imagePath;
				}
				// Otherwise return as is (relative paths)
				return imagePath;
			},
			
			dismiss: function() {
				this.active = false;
				this.disableMobileZoom();
			},
			
			enableMobileZoom: function() {
				let metaTag = document.createElement('meta');
				metaTag.name = 'viewport';
				metaTag.content = 'width=device-width, initial-scale=1.0, user-scalable=yes';
				document.getElementsByTagName('head')[0].appendChild(metaTag);
			},
			
			disableMobileZoom: function() {
				let metaTag = document.createElement('meta');
				metaTag.name = 'viewport';
				metaTag.content = 'width=device-width, initial-scale=1.0, user-scalable=no';
				document.getElementsByTagName('head')[0].appendChild(metaTag);
			}
		},
		
		mounted() {
			const swiperMain = this.$refs.swiperMain.$swiper;
			const swiperThumbs = this.$refs.swiperThumbs.$swiper;
			swiperMain.controller.control = swiperThumbs;
			swiperThumbs.controller.control = swiperMain;
			
			// enable of gallery open
			//this.enableMobileZoom();
		}
	};
</script>

<style lang='scss' scoped>

	.gallery {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: 9999;
		background-color: rgba(1, 1, 1, .9);
		opacity: 0;
		pointer-events: none;
		transition: 250ms ease;
		cursor: grab;
		
		&.active {
			opacity: 1;
			pointer-events: all;
		}
	
		.swiper {
			padding: 20px 0;
			
			@include mobile-only {
				padding: 0 10px;
			}
			
			.swiper-slide {
				background-size: contain;
				background-position: center;
				background-repeat: no-repeat;
			}
			
			&.gallery-top {
				height: 80vh;
				width: 100%;
				padding: 20px 0;
				
				.swiper-button-next, .swiper-button-prev {
					margin: 0 20px;
					opacity: .6;
					
					&:hover {
						opacity: 1;
					}
					
					&:after {
						font-size: 75px;
						color: white;
						
						@include mobile-only {
							display: none;
						}
					}
				}
			}
			
			&.gallery-thumbs {
				height: 20vh;
			}
			
			&.gallery-thumbs .swiper-slide {
				opacity: 0.4;
				cursor: pointer;
			}
			
			&.gallery-thumbs .swiper-slide-active {
				opacity: 1;
			}
		}
		
		.close {
			position: absolute;
			top: 30px;
			right: 30px;
			cursor: pointer;
			opacity: .6;
			width: 40px;
			z-index: 9999;
			
			&:hover {
				opacity: 1;
			}
		}
	}
	
</style>