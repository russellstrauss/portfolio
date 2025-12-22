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
							self.typesetMath();
						});
					}
				}
			},
			
			typesetMath: function() {
				const self = this;
				// Get the container element that holds the raw HTML
				const container = this.$el ? this.$el.querySelector('.raw-html-container') : null;
				
				// Function to actually typeset the math
				const doTypeset = function() {
					if (window.MathJax && window.MathJax.typesetPromise) {
						// MathJax 4 uses promises - can target specific elements
						const elements = container ? [container] : undefined;
						window.MathJax.typesetPromise(elements).catch(function (err) {
							console.error('MathJax typeset error:', err);
						});
					} else if (window.MathJax && window.MathJax.typeset) {
						// Fallback for older MathJax versions
						if (container) {
							window.MathJax.typeset([container]);
						} else {
							window.MathJax.typeset();
						}
					}
				};
				
				// Wait for MathJax to be fully initialized
				if (window.MathJax) {
					// MathJax 4 has a startup promise we should wait for
					if (window.MathJax.startup && window.MathJax.startup.promise) {
						window.MathJax.startup.promise.then(function() {
							setTimeout(doTypeset, 100);
						}).catch(function(err) {
							console.error('MathJax startup error:', err);
							// Try anyway after a delay
							setTimeout(doTypeset, 200);
						});
					} else if (window.MathJax.typesetPromise || window.MathJax.typeset) {
						// MathJax is loaded, just wait a bit for DOM
						setTimeout(doTypeset, 100);
					} else {
						// MathJax not fully loaded, wait for it
						const checkMathJax = setInterval(() => {
							if (window.MathJax && (window.MathJax.typesetPromise || window.MathJax.typeset)) {
								clearInterval(checkMathJax);
								if (window.MathJax.startup && window.MathJax.startup.promise) {
									window.MathJax.startup.promise.then(function() {
										setTimeout(doTypeset, 100);
									});
								} else {
									setTimeout(doTypeset, 100);
								}
							}
						}, 100);
						// Stop checking after 5 seconds
						setTimeout(() => clearInterval(checkMathJax), 5000);
					}
				} else {
					// MathJax script not loaded yet, wait for it
					const checkMathJax = setInterval(() => {
						if (window.MathJax) {
							clearInterval(checkMathJax);
							// Recursively call to handle startup promise
							self.typesetMath();
						}
					}, 100);
					// Stop checking after 5 seconds
					setTimeout(() => clearInterval(checkMathJax), 5000);
				}
			}
		},

		mounted: function () {
			this.loadDetails();
			Prism.highlightAll();
			this.typesetMath();
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