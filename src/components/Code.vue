<template>
	<Layout>
		<div class="code-page">
			<div class="main-content">
				<PageTitle v-if="details.title" :title="details.title"></PageTitle>
				<div v-if="details.rawHTML" class="raw-html-container">
					<div v-html="details.rawHTML"></div>
				</div>

				<div v-if="details.codeBlocks">
					<CodeBlock v-for="codeBlock in details.codeBlocks" :key="codeBlock.src" :src="codeBlock.src" :pretext="codeBlock.pretext" :posttext="codeBlock.posttext"></CodeBlock>
				</div>
			</div>
		</div>
	</Layout>
</template>

<script>
	
	import Layout from './Layout.vue';
	import CodeBlock from './CodeBlock.vue';
	import PageTitle from './PageTitle.vue';
	import piecesData from '@/data/data_preprocessing.js';
	
	export default {
		
		name: 'Code',

		components: {
			Layout,
			CodeBlock,
			PageTitle
		},

		data() {
			return {
				details: {}
			};
		},

		methods: {
			loadDetails: function() {
				let self = this;

				// Use imported pieces data instead of axios
				let categories = piecesData.categories;
				let category = categories.filter(category => category.path === self.$route.params.category);

				if (category[0]) {
					let newDetails = category[0].pieces.filter(details => details.href === self.$route.path)[0];
					if (newDetails) {
						self.details = newDetails;
						// Re-run syntax highlighting and MathJax after content updates
						self.$nextTick(() => {
							Prism.highlightAll();
							MathJax.typeset();
						});
					}
				}
			}
		},

		mounted: function () {
			this.loadDetails();
			Prism.highlightAll();
			MathJax.typeset();
		},

		watch: {
			'$route': function(to, from) {
				// Reload data when route changes (different piece or category)
				if (to.params.category !== from.params.category || to.params.id !== from.params.id) {
					this.loadDetails();
				}
			}
		}
	};
</script>

<style lang="scss">
	.code-page {

	}
</style>