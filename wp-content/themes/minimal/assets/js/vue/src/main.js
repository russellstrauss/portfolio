import Vue from 'vue';
import { store } from './store';
import AttractionsFilterGrid from './components/AttractionsFilterGrid/AttractionsFilterGrid.vue';
import DailySchedule from './components/DailySchedule/DailySchedule.vue';
Vue.use(require('vue-moment'));
Vue.config.productionTip = false;

if (document.querySelector('#attractionsFilterGrid')) {
	
	new Vue({
		render: h => h(AttractionsFilterGrid),
	}).$mount('#attractionsFilterGrid');
}

if (document.querySelector('#dailySchedule')) {
	
	new Vue({
		render: h => h(DailySchedule),
		store
	}).$mount('#dailySchedule');
}
