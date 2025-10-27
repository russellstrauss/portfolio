import { createApp } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';

import App from './App.vue';
import Home from './Home.vue';
import About from './About.vue';
import Work from './Work.vue';
import Resume from './Resume.vue';
import CategoryDetail from './components/CategoryDetail.vue';
import DetailPage from './components/DetailPage.vue';
import GenericPage from './components/GenericPage.vue';
import Code from './components/Code.vue';
import Missing from './components/Missing.vue';
// import PointCloud from './components/PointCloud.vue';

window.Prism = window.Prism || {};
Prism.manual = true;

let baseUrl = process.env.NODE_ENV === 'production' ? 'https://portfolio.jrstrauss.net/' : '/'; // also update vue.config.js

const router = createRouter({
	base: baseUrl,
	history: createWebHistory(),
	routes: [
		{ path: '/', component: Home },
		{ path: '/about', component: About },
		{ path: '/work', component: Work },
		{ path: '/resume', component: Resume },
		{ path: '/work/:category', component: CategoryDetail },
		{ path: '/work/detail/:category', component: GenericPage }, // category landing page instead of listing page
		{ path: '/work/:category/detail/:id', component: GenericPage }, // detail page for item in category listing page
		{ path: '/work/:category/:id', component: GenericPage },
		{ path: '/work/:category/code/:id', component: Code },
		// { path: '/cg/point-cloud', component: PointCloud },
		{ path: '/:pathMatch(.*)*', component: Missing }

	]
});

const app = createApp(App);
app.use(router);
app.mount('#app');

// Add polyfills for forEach for IE and .closest()
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}

// Vue.use(VueAwesomeSwiper, /* { default options with global component } */);