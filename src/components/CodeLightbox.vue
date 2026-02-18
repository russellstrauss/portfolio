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
			<!-- Inline content: clone of same-page code block (anchor by elementId) -->
			<div v-if="inline?.elementId" ref="inlineCodeContainer" class="code-lightbox__code"></div>
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
					this.renderInlineFromAnchor();
					Prism.highlightAll();
				});
			} else {
				this.clearInlineContainer();
				document.body.style.overflow = '';
			}
		},
		inline: {
			handler(newVal) {
				if (newVal?.elementId && this.open && this.$refs.inlineCodeContainer) {
					this.$nextTick(() => {
						this.renderInlineFromAnchor();
						Prism.highlightAll();
					});
				}
			},
			deep: true
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
		this.clearInlineContainer();
		document.body.style.overflow = '';
	},

	methods: {
		close() {
			this.$emit('close');
		},
		renderInlineFromAnchor() {
			if (!this.inline?.elementId || !this.$refs.inlineCodeContainer) return;
			const sourceEl = document.getElementById(this.inline.elementId);
			if (!sourceEl?.hasAttribute('data-code-lightbox-source')) return;
			const preEl = sourceEl.querySelector('pre');
			if (!preEl) return;
			this.clearInlineContainer();
			this.$refs.inlineCodeContainer.appendChild(preEl.cloneNode(true));
		},
		clearInlineContainer() {
			const container = this.$refs?.inlineCodeContainer;
			if (container) {
				while (container.firstChild) container.removeChild(container.firstChild);
			}
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
