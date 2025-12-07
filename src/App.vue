<template>
	<router-view/>
</template>

<script>
import Galaxy from '@/js/cg/galaxy.js';

export default {
	name: 'App',
	
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