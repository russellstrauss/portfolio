import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import './sass/main.scss';
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

// Base URL for router - must match vite.config.js base
// For GitHub Pages, this should match the repository path
// Can be set via VITE_BASE_URL environment variable at build time
let baseUrl = import.meta.env.BASE_URL || '/';

const router = createRouter({
	history: createWebHistory(baseUrl),
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
		// Catch-all route for unmatched Vue routes
		// Static files in public/ are served by Vite before the router intercepts them
		{ path: '/:pathMatch(.*)*', component: Missing }

	]
});

// Handle GitHub Pages 404.html redirect
// When 404.html redirects to the base path, it stores the intended path in sessionStorage
const redirectPath = sessionStorage.getItem('githubPagesRedirect');
if (redirectPath) {
	sessionStorage.removeItem('githubPagesRedirect');
	// Use replace to avoid adding to history
	router.replace(redirectPath).catch(() => {
		// If the route doesn't exist, the catch-all will handle it
	});
}

const app = createApp(App);

// Error handling for debugging
app.config.errorHandler = (err, instance, info) => {
	console.error('Vue Error:', err);
	console.error('Component:', instance);
	console.error('Info:', info);
};

app.use(router);
app.mount('#app');

// Add polyfills for forEach for IE and .closest()
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}

// Vue.use(VueAwesomeSwiper, /* { default options with global component } */);