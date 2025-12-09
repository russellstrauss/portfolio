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
		// First, try calling next() to see if Cloudflare Pages serves the static file
		// before the redirect processes it
		const response = await next();
		
		// Check if we got the actual file or if it was redirected to index.html
		const contentType = response.headers.get('Content-Type') || '';
		
		// If we got HTML but requested a static file, the redirect caught it
		if (contentType.includes('text/html') && hasFileExtension) {
			// The redirect intercepted the static file
			// Try using ASSETS binding as a fallback
			if (env.ASSETS) {
				try {
					const assetResponse = await env.ASSETS.fetch(request);
					
					if (assetResponse.ok) {
						// Return the asset response directly without modification
						// This preserves the original body stream
						return assetResponse;
					}
				} catch (error) {
					console.error('Error fetching static file from ASSETS:', error);
				}
			}
			
			// If ASSETS also failed, return 404
			return new Response(`Static file not found: ${pathname}`, { 
				status: 404,
				headers: { 'Content-Type': 'text/plain' }
			});
		}
		
		// We got the actual file from next(), but we may need to add headers
		// Only modify headers if needed, don't touch the body
		if (pathname.endsWith('.json')) {
			// Add CORS header for JSON files
			const newHeaders = new Headers(response.headers);
			newHeaders.set('Access-Control-Allow-Origin', '*');
			return new Response(response.body, {
				status: response.status,
				statusText: response.statusText,
				headers: newHeaders
			});
		}
		
		// For all other static files, return as-is (don't modify)
		return response;
	}

	// For routes without file extensions (Vue Router routes), 
	// let the redirect handle them
	return next();
}

