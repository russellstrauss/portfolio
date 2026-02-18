<template>
	<div class="container-fluid" :class="{ 'landing': $route.path === '/' }" @click="handleCodeLightboxClick">
		<Title v-if="$route.path !== '/resume'"></Title>
		<div class="layout-wrapper" v-if="$route.path !== '/resume'">
			<Nav></Nav>
			<div class="router-view-container">
				<router-view v-slot="{ Component, route }">
					<keep-alive include="Work,CategoryDetail,GenericPage,DetailPage,Code">
						<transition name="fade" @after-leave="scrollToTop">
							<component :is="Component" :key="route.fullPath" />
						</transition>
					</keep-alive>
				</router-view>
			</div>
		</div>
		<router-view v-else v-slot="{ Component, route }">
			<transition name="fade" @after-leave="scrollToTop">
				<component :is="Component" :key="route.fullPath" />
			</transition>
		</router-view>
		<CodeLightbox
			:open="codeLightbox.open"
			:piece="codeLightbox.piece"
			:inline="codeLightbox.inline"
			@close="closeCodeLightbox"
		/>
	</div>
</template>

<script>
import Galaxy from '@/js/cg/galaxy.js';
import Title from '@/components/Title.vue';
import Nav from '@/components/Nav.vue';
import CodeLightbox from '@/components/CodeLightbox.vue';
import { getPieceByHref } from '@/data/data_preprocessing.js';

// Regex for code page routes: /work/:category/code/:id
const CODE_PAGE_PATTERN = /\/work\/[^/]+\/code\/[^/]+/;

export default {
	name: 'App',
	
	components: {
		Title,
		Nav,
		CodeLightbox
	},
	
		data() {
			return {
				codeLightbox: {
					open: false,
					piece: null,
					inline: null  // { title: string, html: string } for same-page code blocks
				}
			};
		},
	
	methods: {
		closeCodeLightbox() {
			this.codeLightbox.open = false;
			this.codeLightbox.piece = null;
			this.codeLightbox.inline = null;
		},
		scrollToTop: function() {
			// Scroll to top after old component has completely left
			// after-leave fires when old page is completely gone but before new one is visible
			window.scrollTo(0, 0);
		},
		
		handleCodeLightboxClick(event) {
			// Check if click was on a link marked for code lightbox
			const link = event.target.closest('a[data-code-lightbox]');
			if (!link || !link.href) return;
			
			const hrefAttr = link.getAttribute('href') || '';
			
			// Same-page reference: href="#code-block-id" - show inline code from the page
			if (hrefAttr.startsWith('#')) {
				const id = hrefAttr.slice(1).trim();
				if (!id) return;
				
				const sourceEl = document.getElementById(id);
				if (!sourceEl || !sourceEl.hasAttribute('data-code-lightbox-source')) return;
				
				event.preventDefault();
				
				// Find the pre/code block inside (already syntax-highlighted by Prism)
				const preEl = sourceEl.querySelector('pre');
				if (!preEl) return;
				
				const title = link.getAttribute('data-code-lightbox') || link.textContent.trim() || 'Code';
				const html = preEl.outerHTML;
				
				this.codeLightbox.piece = null;
				this.codeLightbox.inline = { title, html };
				this.codeLightbox.open = true;
				return;
			}
			
			// Code page link: href="/work/category/code/id" - load piece with codeBlocks
			let pathname;
			try {
				pathname = new URL(link.href, window.location.origin).pathname;
			} catch {
				pathname = link.href;
			}
			
			if (!CODE_PAGE_PATTERN.test(pathname)) return;
			
			event.preventDefault();
			
			const piece = getPieceByHref(pathname);
			if (piece && piece.codeBlocks && piece.codeBlocks.length > 0) {
				this.codeLightbox.inline = null;
				this.codeLightbox.piece = piece;
				this.codeLightbox.open = true;
			} else {
				this.$router.push(pathname);
			}
		}
	},
	
	mounted: function () {
		// Disable browser's automatic scroll restoration to prevent flicker
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}
		
		try {
			if (Galaxy && typeof Galaxy.init === 'function') {
				Galaxy.init();
			}
		} catch (error) {
			console.error('Error initializing Galaxy:', error);
		}
	}
}
</script>

<style scoped>
/* Container for router-view to maintain layout during transitions */
.router-view-container {
	position: relative;
	flex: 1 1 auto;
	width: 100%;
}

/* Smooth fade transition between routes */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-leave-active {
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	z-index: 1;
}

.fade-enter-active {
	position: relative;
	z-index: 2;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>