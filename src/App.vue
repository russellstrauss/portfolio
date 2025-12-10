<template>
	<div class="container-fluid" :class="{ 'landing': $route.path === '/' }">
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
	</div>
</template>

<script>
import Galaxy from '@/js/cg/galaxy.js';
import Title from '@/components/Title.vue';
import Nav from '@/components/Nav.vue';

export default {
	name: 'App',
	
	components: {
		Title,
		Nav
	},
	
	methods: {
		scrollToTop: function() {
			// Scroll to top after old component has completely left
			// after-leave fires when old page is completely gone but before new one is visible
			window.scrollTo(0, 0);
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