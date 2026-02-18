<template>
	<Teleport to="body">
		<div
			v-if="open"
			class="code-lightbox"
			role="dialog"
			aria-modal="true"
			@keydown.esc="close"
		>
			<div class="code-lightbox__backdrop" aria-hidden="true" @click="close"></div>
			<!-- Inline content from same-page code block reference -->
			<div v-if="inline?.html" class="code-lightbox__code" v-html="inline.html"></div>
			<!-- Piece content (codeBlocks from pieces.json) -->
			<template v-else>
				<div
					v-for="(codeBlock, index) in (piece?.codeBlocks || [])"
					:key="codeBlock.src || index"
					class="code-lightbox__block"
				>
					<div v-if="codeBlock.src" class="code-lightbox__code">
						<pre :data-src="codeBlock.src"></pre>
					</div>
				</div>
			</template>
		</div>
	</Teleport>
</template>

<script>
export default {
	name: 'CodeLightbox',

	props: {
		open: {
			type: Boolean,
			default: false
		},
		piece: {
			type: Object,
			default: null
		},
		inline: {
			type: Object,
			default: null
		}
	},

	emits: ['close'],

	watch: {
		open(newVal) {
			if (newVal) {
				document.body.style.overflow = 'hidden';
				this.$nextTick(() => {
					Prism.highlightAll();
				});
			} else {
				document.body.style.overflow = '';
			}
		},
		piece: {
			handler(newVal) {
				if (newVal && this.open) {
					this.$nextTick(() => {
						Prism.highlightAll();
					});
				}
			},
			deep: true
		}
	},

	beforeUnmount() {
		document.body.style.overflow = '';
	},

	methods: {
		close() {
			this.$emit('close');
		}
	}
};
</script>

<style lang="scss" scoped>
@use '@/sass/responsive' as *;

.code-lightbox {
	position: fixed;
	inset: 0;
	z-index: 9999;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow-y: auto;
	pointer-events: none;
	margin: 20px 0;

	> * {
		pointer-events: auto;
	}
}

.code-lightbox__backdrop {
	position: fixed;
	inset: 0;
	z-index: 0;
	background-color: rgba(0,0,0,.5);
	cursor: pointer;
}

.code-lightbox__code {
	position: relative;
	z-index: 1;
	width: 95vw;
	max-width: 1400px;
	max-height: 100%;
	overflow: auto;

	:deep(pre) {
		margin: 0;
		padding: 1rem;
		background-color: rgba(0,0,0,.9);
		overflow-x: auto;
		font-size: 0.8125rem;
		line-height: 1.5;
	}

	@include mobile-only {
		:deep(pre) {
			font-size: 0.75rem;
			padding: 0.75rem;
		}
	}
}

.code-lightbox__block {
	position: relative;
	z-index: 1;
	width: 95vw;
	max-width: 1400px;
	max-height: 100%;
	overflow: auto;

	:deep(pre) {
		margin: 0;
		padding: 1rem;
		background-color: rgba(0,0,0,.9);
		overflow-x: auto;
		font-size: 0.8125rem;
		line-height: 1.5;
	}

	@include mobile-only {
		:deep(pre) {
			font-size: 0.75rem;
			padding: 0.75rem;
		}
	}
}

</style>
