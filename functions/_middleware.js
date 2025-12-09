/**
 * Cloudflare Pages Function middleware
 * 
 * This middleware intercepts ALL static file requests (files with extensions)
 * to prevent the catch-all redirect from intercepting them.
 * Vue Router routes (without extensions) are handled by the _redirects file.
 */
export async function onRequest(context) {
	const { request, env, next } = context;
	const url = new URL(request.url);
	const pathname = url.pathname;

	// Check if this is a request for a static file (has a file extension)
	const hasFileExtension = /\.\w+$/.test(pathname);
	
	// If it's a static file, we MUST intercept it to prevent the redirect from catching it
	if (hasFileExtension) {
		// Try to fetch from ASSETS binding first
		if (env.ASSETS) {
			try {
				const assetResponse = await env.ASSETS.fetch(request);
				
				if (assetResponse.ok) {
					// Determine content type based on file extension
					let contentType = assetResponse.headers.get('Content-Type') || '';
					
					// Set proper content types for common file types
					if (pathname.endsWith('.pdf')) {
						contentType = 'application/pdf';
					} else if (pathname.endsWith('.json')) {
						contentType = 'application/json';
					} else if (pathname.endsWith('.js')) {
						contentType = 'application/javascript';
					} else if (pathname.endsWith('.css')) {
						contentType = 'text/css';
					}
					
					// Return the file with proper headers
					const headers = new Headers(assetResponse.headers);
					headers.set('Content-Type', contentType);
					
					// Add CORS headers for JSON files (needed for axios requests)
					if (pathname.endsWith('.json')) {
						headers.set('Access-Control-Allow-Origin', '*');
					}
					
					// Cache headers for static assets
					if (pathname.endsWith('.pdf') || pathname.endsWith('.jpg') || pathname.endsWith('.png')) {
						headers.set('Cache-Control', 'public, max-age=31536000');
					}
					
					return new Response(assetResponse.body, {
						status: assetResponse.status,
						statusText: assetResponse.statusText,
						headers: headers
					});
				}
			} catch (error) {
				console.error('Error fetching static file from ASSETS:', error);
			}
		}
		
		// If ASSETS binding failed or isn't available, try calling next()
		// This should serve the static file if Cloudflare Pages handles it before redirects
		const response = await next();
		
		// Check if we got the actual file or if it was redirected to index.html
		const contentType = response.headers.get('Content-Type') || '';
		
		// If we got HTML but requested a static file, the redirect caught it
		if (contentType.includes('text/html') && hasFileExtension) {
			// The redirect intercepted the static file - return 404
			return new Response(`Static file not found: ${pathname}\n\nThe catch-all redirect is intercepting static file requests.`, { 
				status: 404,
				headers: { 'Content-Type': 'text/plain' }
			});
		}
		
		// We got the actual file, return it
		return response;
	}

	// For routes without file extensions (Vue Router routes), 
	// let the redirect handle them
	return next();
}

