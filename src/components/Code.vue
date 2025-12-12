<template>
	<div class="code-page container-fluid">
		
		<Title></Title>
		<div class="layout-wrapper">
			<Nav></Nav>
			
			<div class="main-content">
				<PageTitle v-if="details.title" :title="details.title"></PageTitle>
				<div v-if="details.rawHTML" class="raw-html-container">
					<div v-html="details.rawHTML"></div>
				</div>
				
				<div v-if="details.codeBlocks">
					<CodeBlock v-for="codeBlock in details.codeBlocks" :key="codeBlock.src" :src="codeBlock.src" :pretext="codeBlock.pretext" :posttext="codeBlock.posttext"></CodeBlock> 
				</div>
				
				<!-- <canvas data-processing-sources="/code/interactive/cg/fermat.pde"></canvas> -->
			</div>
		</div>
	</div>
</template>

<script>
	
	import Title from './Title.vue';
	import Nav from './Nav.vue';
	import CodeBlock from './CodeBlock.vue';
	import PageTitle from './PageTitle.vue';
	import piecesData from '@/data/pieces.js';
	
	// Note: linear-algebra is imported but Vector/Matrix may not be used in this component
	// If needed, uncomment and use dynamic import:
	// const linearAlgebra = (await import('linear-algebra')).default();
	// const Vector = linearAlgebra.Vector;
	// const Matrix = linearAlgebra.Matrix;
	
	export default {
		
		name: 'Code',

		components: {
			Title,
			Nav,
			CodeBlock,
			PageTitle
		},

		data() {
			return {
				details: {}
			};
		},

		methods: {
		},

		mounted: function () {
			
			let self = this;
			
			// Use imported pieces data instead of axios
			let categories = piecesData.categories;
			let category = categories.filter(category => category.path === self.$route.params.category);
			
			if (category[0]) {
				self.details = category[0].pieces.filter(details => details.href === self.$route.path)[0];
			}
			
			// Run syntax highlighter after code has been loaded
			Prism.highlightAll();
			MathJax.typeset();
		}
	};
</script>

<style lang="scss">
	.code-page {

	}
</style>