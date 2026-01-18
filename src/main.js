import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

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
// Can be set via VITE_BASE_URL environment variable at build time
let baseUrl = import.meta.env.BASE_URL || '/';

const router = createRouter({
	history: createWebHistory(baseUrl),
	scrollBehavior(to, from, savedPosition) {
		// Always return false to prevent automatic scrolling
		// We handle scrolling manually in transition hooks to prevent flicker
		return false;
	},
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

const app = createApp(App);


// Error handling for debugging
app.config.errorHandler = (err, instance, info) => {
	console.error('Vue Error:', err);
	console.error('Component:', instance);
	console.error('Info:', info);
};

app.use(router);
app.use(FloatingVue);
app.mount('#app');

// Preserve scroll position during HMR updates
if (import.meta.hot) {
	let savedScrollPosition = { x: 0, y: 0 };
	let isHMRUpdate = false;
	
	// Save scroll position before any HMR update
	const saveScrollPosition = () => {
		savedScrollPosition = {
			x: window.scrollX || window.pageXOffset,
			y: window.scrollY || window.pageYOffset
		};
		isHMRUpdate = true;
		// Save to sessionStorage as backup
		sessionStorage.setItem('hmr-scroll-x', String(savedScrollPosition.x));
		sessionStorage.setItem('hmr-scroll-y', String(savedScrollPosition.y));
	};
	
	// Restore scroll position after HMR update
	const restoreScrollPosition = () => {
		if (isHMRUpdate) {
			// Use multiple strategies to ensure scroll is restored
			requestAnimationFrame(() => {
				window.scrollTo(savedScrollPosition.x, savedScrollPosition.y);
				// Also try after a short delay in case DOM isn't ready
				setTimeout(() => {
					window.scrollTo(savedScrollPosition.x, savedScrollPosition.y);
				}, 0);
			});
			isHMRUpdate = false;
		}
	};
	
	// Listen for HMR update events (Vite 6 uses these event names)
	try {
		import.meta.hot.on('vite:beforeUpdate', saveScrollPosition);
		import.meta.hot.on('vite:afterUpdate', restoreScrollPosition);
	} catch (e) {
		// Fallback: use generic HMR events if specific ones don't exist
		console.warn('HMR scroll preservation: using fallback method');
	}
	
	// Restore on page load if it was an HMR update
	if (sessionStorage.getItem('hmr-scroll-x') && sessionStorage.getItem('hmr-scroll-y')) {
		const x = parseInt(sessionStorage.getItem('hmr-scroll-x'), 10);
		const y = parseInt(sessionStorage.getItem('hmr-scroll-y'), 10);
		requestAnimationFrame(() => {
			window.scrollTo(x, y);
		});
		sessionStorage.removeItem('hmr-scroll-x');
		sessionStorage.removeItem('hmr-scroll-y');
	}
}

// Add polyfills for forEach for IE and .closest()
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}

// Vue.use(VueAwesomeSwiper, /* { default options with global component } */);