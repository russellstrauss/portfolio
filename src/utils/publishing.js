/**
 * Utility function to determine if content should be published based on its publishing state
 * and the current environment (dev vs production).
 * 
 * @param {string} published - The publishing state: "true", "false", or "dev"
 * @returns {boolean} - true if content should be shown, false otherwise
 * 
 * Rules:
 * - "true": Show in both dev and production
 * - "false": Hide in both dev and production
 * - "dev": Show only in dev mode, hide in production
 */
export function isPublished(published) {
	if (!published) return false;
	
	const publishedValue = String(published).toLowerCase();
	const isDevMode = import.meta.env.DEV;
	
	if (publishedValue === "true") {
		return true; // Show in both dev and production
	}
	
	if (publishedValue === "false") {
		return false; // Hide in both dev and production
	}
	
	if (publishedValue === "dev") {
		return isDevMode; // Show only in dev mode
	}
	
	// Default to false for unknown values
	return false;
}

