import Vue from 'vue';
import VueRouter from 'vue-router';
import './sass/main.scss';
import VueAwesomeSwiper from 'vue-awesome-swiper';

import App from './App.vue';
import Home from './Home.vue';
import About from './About.vue';
import Work from './Work.vue';
import Resume from './Resume.vue';
import CategoryDetail from './components/CategoryDetail.vue';
import DetailPage from './components/DetailPage.vue';
import GenericPage from './components/GenericPage.vue';
import Missing from './components/Missing.vue';

let baseUrl = process.env.NODE_ENV === 'production' ? '/' : '/'; // also update vue.config.js

const router = new VueRouter({
	base: baseUrl,
	mode: 'history',
	routes: [
		{ path: '/', component: Home },
		{ path: '/about', component: About },
		{ path: '/work', component: Work },
		{ path: '/resume', component: Resume },
		{ path: '/work/:category', component: CategoryDetail },
		{ path: '/work/detail/:category', component: GenericPage }, // category landing page instead of listing page
		{ path: '/work/:category/detail/:id', component: GenericPage }, // detail page for item in category listing page
		{ path: '/work/:category/:id', component: GenericPage },
		{ path: '*', component: Missing }
	]
});

Vue.use(VueRouter);
new Vue({
	el: '#app',
	router: router,
	render: h => h(App)
});

// Add polyfills for forEach for IE and .closest()
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}

Vue.use(VueAwesomeSwiper, /* { default options with global component } */);