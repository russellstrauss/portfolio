/**
 * Cloudflare Pages Function middleware
 * 
 * This middleware intercepts ALL requests before the _redirects file is processed.
 * For static files (with extensions), we return early to prevent the catch-all redirect.
 * For routes without extensions, we let them pass through to be handled by _redirects.
 */
export async function onRequest(context) {
	const { request, env, next } = context;
	const url = new URL(request.url);
	const pathname = url.pathname;

	// Check if this is a request for a static file (has a file extension)
	const hasFileExtension = /\.\w+$/.test(pathname);
	
	// If it's a static file, we MUST handle it here and NOT call next()
	// because next() will trigger the redirect which will catch everything
	if (hasFileExtension) {
		// For static files, we need to fetch them directly from the ASSETS
		// The ASSETS binding gives us access to the static files
		if (env.ASSETS) {
			try {
				// Fetch the file directly from the static assets
				const assetResponse = await env.ASSETS.fetch(request);
				
				// If we got the file successfully
				if (assetResponse.ok) {
					// For PDFs, set proper headers
					if (pathname.endsWith('.pdf')) {
						return new Response(assetResponse.body, {
							status: assetResponse.status,
							statusText: assetResponse.statusText,
							headers: {
								'Content-Type': 'application/pdf',
								'Cache-Control': 'public, max-age=31536000',
								'Access-Control-Allow-Origin': '*',
							}
						});
					}
					
					// For other static files, return as-is
					return assetResponse;
				}
			} catch (error) {
				console.error('Error fetching static file:', error);
			}
		}
		
		// If ASSETS binding is not available or file not found, return 404
		return new Response(`File not found: ${pathname}`, { 
			status: 404,
			headers: { 'Content-Type': 'text/plain' }
		});
	}

	// For routes without file extensions (Vue Router routes), 
	// call next() to let the redirect handle it
	return next();
}

