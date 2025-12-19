<template>
	<div class="landing">
		<iframe style="dispay: none; !important;" width="560" height="315" src="https://www.youtube-nocookie.com/embed/wE2GZ2Vpqjo?rel=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowfullscreen></iframe>
	</div>
</template>

<script>
	
	export default {
		name: 'Home',

		data() {
			return {};
		},

		methods: {}
	};
</script>

<style lang="scss">
	
	.landing {
		
		.name {
			@include ibm;
			
			a {
				color: white;
			}
		}
		
		.main {
			
			li {
				
				a {
					@include ibm;
					color: white;
					
					&:hover {
						color: #2592BE;
					}
				}
			}
		}
		
		
		
	iframe {
		display: none;
	}
}

</style>