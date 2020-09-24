<template>
	<div class="code-page">
		
		<Title></Title>
		<div class="layout-wrapper">
			<Nav></Nav>
			
			<div class="main-content">
				<h1>Code Page {{details.title}}</h1>
				<div v-if="details.rawHTML" class="raw-html-container">
					<div v-html="details.rawHTML"></div>
				</div>
				
				<CodeBlock v-for="codeBlock in codeBlocks" :key="codeBlock.src" :src="'/code/lu1.java'" :pretext="codeBlock.pretext" :posttext="codeBlock.posttext"></CodeBlock> 
			</div>
		</div>
	</div>
</template>

<script>
	
	import Title from './Title.vue';
	import Nav from './Nav.vue';
	import CodeBlock from './CodeBlock.vue';
	import axios from 'axios';
	
	export default {
		
		name: 'Code',

		components: {
			Title,
			Nav,
			CodeBlock
		},

		data() {
			return {
				details: {},
				codeBlocks: []
			};
		},

		methods: {},

		mounted: function () {
			
			let self = this;
			
			let pieces = '/data/pieces.json';
			axios.get(pieces).then(function(response) {
				
				let categories = response.data.categories;
				let category = categories.filter(category => category.path === self.$route.params.category);
				console.log(category);
				if (category[0]) self.details = category[0].pieces.filter(details => details.href === self.$route.path)[0];
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	};
</script>

<style lang="scss">
	.code-page {
		
		h1 {
			margin-bottom: 100px;
		}
	}
</style>