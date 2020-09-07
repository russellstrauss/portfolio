<template>

	<div class="modal-x">
		<h2 class="title" v-if="title">{{ title }}</h2>
		<slot></slot>
	</div>
	
</template>

<script>
	
	export default {
		
		name: 'Modal',
		
		props: ['title', 'intro'],
		
		data() {
			
			return {
				
			}
		},
		
		methods: {
			
			
		},
		
		mounted: function() {
			
		}
	}
	
</script>

<style lang="scss">

	.modal-x {
		@include shadow;
		border-radius: 5px;
		padding: 20px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: rgba(white, .88);
		max-height: 90vh;
		z-index: 9999;
		max-width: calc(100vw - 30px);
		width: 500px;
		
		@include mobile-only {
			position: fixed;
			width: 100%;
			height: 100vh;
			max-width: 100%;
			max-height: 100vh;
			border-radius: 0;
			overflow-y: scroll;
		}
		
		.title {
			margin-bottom: 20px;
			text-align: center;
			
			@include mobile-only {
				margin-top: 20px;
			}
		}
		
		.intro {
			text-align: center;
		}
		
		*:last-child {
			margin-bottom: 0;
		}
		
		form {
			
			.form-group {
				
				&.two-column {
					display: flex;
					justify-content: space-between;
					
					* {
						flex-basis: calc(50% - 10px);
					}
				}
				
				label {
					display: block;
					margin-bottom: 10px;
				}
				
				input, textarea {
					border-radius: 5px;
					display: block;
					width: 100%;
				}
				
				input[type="submit"] {
					@include button-primary;
				}
			}
		}
	}

</style>