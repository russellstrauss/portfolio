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

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), serveStaticIndexPlugin(), watchDataFilesPlugin()],
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
	base: '/',
	build: {
		outDir: 'dist',
		rollupOptions: {
			output: {
				entryFileNames: '[name].js',
				chunkFileNames: '[name].js',
				assetFileNames: '[name].[ext]'
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

