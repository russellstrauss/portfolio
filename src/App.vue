<template>
	<div class="container-fluid" :class="{ 'landing': $route.path === '/' }">
		<Title v-if="$route.path !== '/resume'"></Title>
		<div class="layout-wrapper" v-if="$route.path !== '/resume'">
			<Nav></Nav>
			<router-view v-slot="{ Component, route }">
				<transition name="fade" mode="out-in">
					<component :is="Component" :key="route.path" />
				</transition>
			</router-view>
		</div>
		<router-view v-else v-slot="{ Component, route }">
			<transition name="fade" mode="out-in">
				<component :is="Component" :key="route.path" />
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
	
	mounted: function () {
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
/* Smooth fade transition between routes */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>