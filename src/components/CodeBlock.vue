<template>
	<div class="code-block">
		
		<div v-if="pretext" v-html="pretext"></div>

		<div class="code">
			<pre :data-src="src"></pre>
		</div>
		
		<div v-if="posttext" v-html="posttext"></div>
		
	</div>
</template>

<script>
	
	import axios from 'axios';
	
	export default {
		
		name: 'CodeBlock',
		
		props: ['src', 'pretext', 'posttext'],

		components: {},

		data() {
			return {
				sourceCode: {}
			};
		},

		methods: {},

		mounted: function () {
			
			let self = this;
		}
	};
</script>

<style lang="scss">
	.code-block {
		
		.code {
			margin: 20px auto;
		}
	}
</style>