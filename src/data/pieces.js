// Import pieces data
import piecesData from './pieces.json';

// Import HTML files using Vite's ?raw syntax
import html3dj from './html/3dj.html?raw';
import htmlImmersiveArt from './html/immersive-art.html?raw';
import htmlColorspace from './html/colorspace.html?raw';
import htmlAlgorhythm from './html/algorhythm.html?raw';
import htmlZoomEternal from './html/zoom-eternal.html?raw';
import htmlLogarithmicSpiral from './html/logarithmic-spiral-camera-motion.html?raw';
import htmlPaintingNature from './html/painting-nature.html?raw';
import htmlGrowasis from './html/growasis.html?raw';
import htmlHiltonGrandVacations from './html/hilton-grand-vacations.html?raw';
import htmlWhiskeys from './html/whiskeys.html?raw';
import htmlArapahoe from './html/arapahoe.html?raw';
import htmlMtHood from './html/mt-hood.html?raw';
import htmlStarOfWonder from './html/star-of-wonder.html?raw';
import htmlMarkovChains from './html/markov-chains.html?raw';

// HOW MATCHING WORKS:
// The system matches HTML files to pieces based on the last segment of the piece's `href` path.
// 
// Example matching:
// - href: "/work/interactive/3DJ" → extracts "3dj" (lowercase) → matches "3dj.html"
// - href: "/work/interactive/immersive-art" → extracts "immersive-art" → matches "immersive-art.html"
// - href: "/work/film/mt-hood" → extracts "mt-hood" → matches "mt-hood.html"
// - href: "/work/web-application-development/detail/growasis" → extracts "growasis" → matches "growasis.html"
//
// To add a new HTML file:
// 1. Create the HTML file in src/data/html/ (e.g., "my-piece.html")
// 2. Import it at the top: import htmlMyPiece from './html/my-piece.html?raw';
// 3. Add it to htmlMap: 'my-piece': htmlMyPiece

// Helper function to extract filename from href
function getHtmlKeyFromHref(href) {
	if (!href) return null;
	// Remove leading/trailing slashes and get the last segment
	const segments = href.replace(/^\/|\/$/g, '').split('/');
	const lastSegment = segments[segments.length - 1];
	// Convert to lowercase to match the htmlMap keys
	return lastSegment.toLowerCase();
}

// Map of href keys to HTML content
const htmlMap = {
	'3dj': html3dj,
	'immersive-art': htmlImmersiveArt,
	'colorspace': htmlColorspace,
	'algorhythm': htmlAlgorhythm,
	'zoom-eternal': htmlZoomEternal,
	'logarithmic-spiral-camera-motion': htmlLogarithmicSpiral,
	'painting-nature': htmlPaintingNature,
	'growasis': htmlGrowasis,
	'hilton-grand-vacations': htmlHiltonGrandVacations,
	'whiskeys': htmlWhiskeys,
	'arapahoe': htmlArapahoe,
	'mt-hood': htmlMtHood,
	'star-of-wonder': htmlStarOfWonder,
	'markov-chains': htmlMarkovChains
};

// Function to merge HTML content into pieces
function mergeHtmlIntoPieces(categories) {
	return categories.map(category => ({
		...category,
		pieces: category.pieces.map(piece => {
			const htmlKey = getHtmlKeyFromHref(piece.href);
			const htmlContent = htmlKey && htmlMap[htmlKey];
			
			// Always set rawHTML: use HTML file if it exists, otherwise use empty string
			return {
				...piece,
				rawHTML: htmlContent || ''
			};
		})
	}));
}

// Merge HTML content into pieces data
const piecesWithHtml = {
	categories: mergeHtmlIntoPieces(piecesData.categories)
};

// Export the merged data
export default piecesWithHtml;

// Export a helper function to get a piece by href
export function getPieceByHref(href) {
	for (const category of piecesWithHtml.categories) {
		const piece = category.pieces.find(p => p.href === href);
		if (piece) return piece;
	}
	return null;
}

// Export a helper function to get a category by path
export function getCategoryByPath(path) {
	return piecesWithHtml.categories.find(c => c.path === path);
}

