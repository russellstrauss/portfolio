<template>
	<Layout>
		<div class="generic-page">
			<div class="main-content">
				<PageTitle v-if="details.title" :title="details.title"></PageTitle>

				<div v-if="details.rawHTML" class="raw-html-container">
					<div v-html="details.rawHTML"></div>
				</div>

				<a class="callout" v-if="details.applicationLink" :href="details.applicationLink.href">
					{{details.applicationLink.text}}
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 108.42 1280 1063.16" xml:space="preserve">
						<g>
							<path d="M84.859,738.095l-1.954-0.428h837.055l-263.14,263.72c-12.886,12.875-19.954,30.316-19.954,48.622 c0,18.307,7.068,35.627,19.954,48.532l40.944,40.965c12.875,12.875,30.032,19.994,48.328,19.994 c18.306,0,35.473-7.068,48.348-19.943l451.071-451.03c12.926-12.927,19.994-30.145,19.943-48.46 c0.051-18.417-7.018-35.646-19.943-48.552L794.441,140.443c-12.875-12.865-30.031-19.943-48.348-19.943 c-18.296,0-35.453,7.089-48.328,19.943l-40.944,40.966c-12.886,12.854-19.954,30.021-19.954,48.327 c0,18.296,7.068,34.558,19.954,47.423L922.93,542.353H83.924c-37.701,0-69.38,32.494-69.38,70.173v57.939 C14.543,708.144,47.159,738.095,84.859,738.095z"/>
						</g>
					</svg>
				</a>

				<PDFViewer v-if="details.pdf" :src="details.pdf"></PDFViewer>
			</div>

			<div class="spacer"></div>
		</div>
	</Layout>
</template>

<script>
	
	import piecesData from '@/data/data_preprocessing.js';
	import Layout from './Layout.vue';
	import PDFViewer from '@/components/PDFViewer.vue';
	import PageTitle from '@/components/PageTitle.vue';
	
	export default {
		
		name: 'GenericPage',

		components: {
			Layout,
			PDFViewer,
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
	.generic-page {
		
		.raw-html-container {
			margin-bottom: 20px;
			
			div *:last-child {
				margin-bottom: 0;
			}

			h2 {
				margin-top: 100px;
			}

			ul, ol {
				margin: 20px 0 20px 20px;

				li {
					padding-left: 5px;
					margin-bottom: 10px;
				}
			}

			ol {
				&.horizontal {
					display: flex;
					justify-content: space-between;
					padding: 0;

					li {
						margin: 0;
					}
				}

				li {
					list-style-type: decimal;
				}
			}

			ul {
				&.no-bullets {

					li {
						list-style-type: none;
					}
				}

				&.horizontal {
					@include tablet {
						display: flex;
						justify-content: space-between;
					}

					li {
						margin: 0;
					}
				}
			}

			hr {
				border: 0;
				background-color: white;
				height: 1px;
				margin: 50px 0;
			}

			table {
				width: 100%;
				margin-bottom: 20px;
				
				thead {
					border-bottom: 3px solid white;
					
					tr td {
						font-size: 1rem;
						font-weight: bold;
					}
				}
				
				tr td {
					font-size: .75rem;
					border: 1px solid white;
					padding: 10px;

					ul {
						margin: 0 0 20px 0;
					}
				}
			}
		}
	}
</style>