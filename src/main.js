import Vue from 'vue';
import VueRouter from 'vue-router';
import moment from 'vue-moment';
import './sass/main.scss';
import './helpers/utils.js';
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(moment);

import App from './App.vue';
import Home from './Home.vue';
// import About from './About.vue';

const routes = [
	{ path: '/', component: Home }
	// { path: '/about', component: About },
];

let baseUrl = process.env.NODE_ENV === 'production' ? '/' : '/'; // also update vue.config.js

const router = new VueRouter({
	base: baseUrl,
	mode: 'history',
	routes: routes
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