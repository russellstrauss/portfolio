/**
 * Cloudflare Pages Function to ensure static files are served correctly
 * This middleware intercepts requests and ensures static files bypass the SPA redirect
 */
export async function onRequest(context) {
	const { request, env, next } = context;
	const url = new URL(request.url);
	const pathname = url.pathname;

	// Check if this is a request for a static file (has a file extension)
	// This regex matches paths ending with a dot followed by alphanumeric characters
	const hasFileExtension = /\.\w+$/.test(pathname);
	
	// If it's a static file, try to fetch it directly from the asset manifest
	if (hasFileExtension) {
		// Try to get the file from the Pages asset handler
		// If the file exists, it will be served; if not, we'll get a 404
		const response = await next();
		
		// If we got a 404 or the response was redirected to index.html, 
		// the static file doesn't exist or wasn't found
		if (response.status === 404 || response.status === 200 && pathname.endsWith('.pdf')) {
			// For PDFs, ensure correct headers even if we got index.html
			if (pathname.endsWith('.pdf')) {
				// Check if the response is actually the PDF or if it's index.html
				const contentType = response.headers.get('Content-Type');
				if (contentType && contentType.includes('application/pdf')) {
					// It's actually a PDF, just ensure headers are correct
					const newResponse = new Response(response.body, response);
					newResponse.headers.set('Content-Type', 'application/pdf');
					newResponse.headers.set('Cache-Control', 'public, max-age=31536000');
					return newResponse;
				}
				// If we got index.html instead of the PDF, return 404
				return new Response('PDF not found', { status: 404 });
			}
		}
		
		// For other static files, return the response as-is
		return response;
	}

	// For non-file requests (Vue Router routes), continue to next handler
	return next();
}

