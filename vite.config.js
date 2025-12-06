import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { existsSync, readFileSync, watch } from 'fs';
import { join, resolve } from 'path';

// Plugin to serve static index.html files from public subdirectories
// This runs early in the middleware chain to serve static files before Vue Router
function serveStaticIndexPlugin() {
	return {
		name: 'serve-static-index',
		enforce: 'pre', // Run before other plugins
		configureServer(server) {
			server.middlewares.use((req, res, next) => {
				// Only check for GET requests
				if (req.method !== 'GET' || !req.url) {
					return next();
				}

				try {
					const urlPath = new URL(req.url, 'http://localhost').pathname;
					
					// Skip if it's already a file with an extension (has a dot before the last /)
					if (urlPath.match(/\.[^/]+$/)) {
						return next();
					}

					// Skip Vue routes - let the Vue app handle these
					const vueRoutes = ['/', '/work', '/about', '/resume'];
					const isVueRoute = vueRoutes.some(route => {
						return urlPath === route || urlPath.startsWith(route + '/');
					});
					
					if (isVueRoute) {
						return next();
					}

					// Normalize path - remove trailing slash if present
					const normalizedPath = urlPath.endsWith('/') ? urlPath.slice(0, -1) : urlPath;
					
					// Check if there's an index.html in a public subdirectory
					const publicDir = resolve(process.cwd(), 'public');
					const staticPath = join(publicDir, normalizedPath, 'index.html');
					
					if (existsSync(staticPath)) {
						// Verify the path is within public directory for security
						const resolvedPath = resolve(staticPath);
						if (resolvedPath.startsWith(publicDir)) {
							// Serve the static index.html file
							const content = readFileSync(staticPath, 'utf-8');
							res.setHeader('Content-Type', 'text/html; charset=utf-8');
							res.statusCode = 200;
							res.end(content);
							return;
						}
					}
				} catch (error) {
					// If there's any error, continue to next middleware
					console.error('Error serving static file:', error.message);
				}

				next();
			});
		}
	};
}

// Plugin to watch JSON files in public/data/ and trigger reload on changes
function watchDataFilesPlugin() {
	return {
		name: 'watch-data-files',
		configureServer(server) {
			const publicDataDir = resolve(process.cwd(), 'public', 'data');
			
			// Only watch if the directory exists
			if (!existsSync(publicDataDir)) {
				return;
			}

			// Watch the data directory for changes
			const watcher = watch(publicDataDir, { recursive: false }, (eventType, filename) => {
				// Only trigger reload for JSON files
				if (filename && filename.endsWith('.json')) {
					console.log(`[watch-data-files] ${filename} changed, reloading...`);
					// Send HMR update to all connected clients
					// The WebSocket server should be available after configureServer runs
					if (server.ws) {
						server.ws.send({
							type: 'full-reload'
						});
					}
				}
			});

			// Clean up watcher on server close
			server.httpServer?.on('close', () => {
				watcher.close();
			});
		}
	};
}

// Plugin to rewrite CSS url() references to include base URL
// Note: Vite automatically handles HTML asset paths (src, href) when base URL is set
function rewriteCssUrlsPlugin() {
	const baseUrl = process.env.VITE_BASE_URL || '/';
	
	return {
		name: 'rewrite-css-urls',
		enforce: 'post',
		generateBundle(options, bundle) {
			// Only process if we have a base URL other than root
			if (baseUrl === '/' || baseUrl === '') {
				return;
			}
			
			// Normalize base URL (ensure it starts with / and ends with /)
			const normalizedBase = baseUrl.startsWith('/') 
				? (baseUrl.endsWith('/') ? baseUrl : baseUrl + '/')
				: '/' + (baseUrl.endsWith('/') ? baseUrl : baseUrl + '/');
			const baseWithoutTrailing = normalizedBase.endsWith('/') ? normalizedBase.slice(0, -1) : normalizedBase;
			
			// Process CSS files - rewrite url() references
			for (const fileName in bundle) {
				const file = bundle[fileName];
				if (file.type === 'asset' && fileName.endsWith('.css')) {
					// Rewrite absolute paths in url() to include base URL
					// Match url(/path) but not url(http://) or url(//) or url(data:) or url(./relative)
					// Handles both quoted and unquoted URLs
					const urlRegex = /url\((['"]?)(\/[^'")]*)\1\)/g;
					file.source = file.source.replace(urlRegex, (match, quote, path) => {
						// Don't rewrite if it's already a full URL, protocol-relative, or data URI
						if (path.startsWith('http://') || 
						    path.startsWith('https://') || 
						    path.startsWith('//') || 
						    path.startsWith('data:') ||
						    path.startsWith('./') ||
						    path.startsWith('../')) {
							return match;
						}
						// Don't rewrite if path already starts with the base URL
						if (path.startsWith(baseWithoutTrailing)) {
							return match;
						}
						// Prepend base URL
						return `url(${quote}${baseWithoutTrailing}${path}${quote})`;
					});
				}
			}
		}
	};
}

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), serveStaticIndexPlugin(), watchDataFilesPlugin(), rewriteCssUrlsPlugin()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@use "@/sass/vars" as *;
					@use "@/sass/mixins" as *;
					@use "@/sass/responsive" as *;
				`
			}
		}
	},
	// Base path for the application
	// Set via VITE_BASE_URL in .env file or environment variable
	base: process.env.VITE_BASE_URL || '/',
	build: {
		outDir: 'dist',
		// Increase chunk size warning limit since three.js is inherently large
		// but properly chunked into its own file
		chunkSizeWarningLimit: 600,
		rollupOptions: {
			output: {
				entryFileNames: '[name].js',
				chunkFileNames: '[name].js',
				assetFileNames: '[name].[ext]',
				manualChunks: (id) => {
					// Separate three.js into its own chunk (it's very large)
					if (id.includes('three') || id.includes('node_modules/three')) {
						return 'three-vendor';
					}
					
					// Separate Vue ecosystem (Vue, Vue Router, FloatingVue)
					if (id.includes('node_modules/vue') || 
					    id.includes('node_modules/@vue') ||
					    id.includes('node_modules/vue-router') ||
					    id.includes('node_modules/floating-vue')) {
						return 'vue-vendor';
					}
					
					// Separate UI/animation libraries
					if (id.includes('node_modules/swiper') ||
					    id.includes('node_modules/animejs') ||
					    id.includes('node_modules/pdfobject')) {
						return 'ui-vendor';
					}
					
					// Separate utility libraries
					if (id.includes('node_modules/axios') ||
					    id.includes('node_modules/prismjs') ||
					    id.includes('node_modules/jquery') ||
					    id.includes('node_modules/linear-algebra') ||
					    id.includes('node_modules/vue-prism-component')) {
						return 'utils-vendor';
					}
					
					// All other node_modules go into vendor chunk
					if (id.includes('node_modules')) {
						return 'vendor';
					}
				}
			}
		}
	},
	publicDir: 'public',
	server: {
		// Watch public/data/ directory for changes
		watch: {
			// Include public/data in watched files (even though it's in publicDir)
			// This ensures file changes trigger HMR
			ignored: ['!**/public/data/**']
		}
	}
});

