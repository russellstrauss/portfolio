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
import htmlAccessibilityPrinciples from './html/accessibility-principles.html?raw';
import htmlAccessibilityStandardsCompliance from './html/accessibility-standards-compliance.html?raw';
import htmlLegalRequirements from './html/legal-requirements.html?raw';
import htmlFundamentalAccessibilityPractices from './html/fundamental-accessibility-practices.html?raw';
import htmlAccessibilityTestingEvaluation from './html/accessibility-testing-evaluation.html?raw';
import htmlAccessibleUiPatterns from './html/accessible-ui-patterns.html?raw';
import htmlAccessibilityForDevelopers from './html/accessibility-for-developers.html?raw';
import htmlAccessibilityInDesignUx from './html/accessibility-in-design-ux.html?raw';
import htmlAccessibleContentMedia from './html/accessible-content-media.html?raw';
import htmlAccessibilityChecklists from './html/accessibility-checklists.html?raw';

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

// Function to remove common leading indentation from code blocks
// Preserves relative indentation while removing the base indentation level
function dedentCode(code) {
	if (!code) return code;
	
	const lines = code.split('\n');
	
	// Find the minimum indentation (excluding empty lines)
	// Convert tabs to spaces for consistent calculation (1 tab = 4 spaces)
	let minIndent = Infinity;
	
	for (const line of lines) {
		// Skip empty lines when calculating minimum indent
		if (line.trim().length === 0) continue;
		
		// Get leading whitespace
		const indentMatch = line.match(/^(\s*)/);
		if (indentMatch) {
			const indent = indentMatch[1];
			// Convert tabs to spaces for consistent calculation
			const indentLength = indent.replace(/\t/g, '    ').length;
			minIndent = Math.min(minIndent, indentLength);
		}
	}
	
	// If no indentation found or all lines are empty, return trimmed code
	if (minIndent === Infinity || minIndent === 0) {
		return code.trim();
	}
	
	// Remove the minimum indentation from each line
	const dedentedLines = lines.map(line => {
		// Preserve empty lines as-is
		if (line.trim().length === 0) return line;
		
		// Get the leading whitespace for this line
		const indentMatch = line.match(/^(\s*)/);
		if (!indentMatch) return line;
		
		const lineIndent = indentMatch[1];
		const lineIndentLength = lineIndent.replace(/\t/g, '    ').length;
		
		// If this line has less indent than minimum, leave it as-is
		if (lineIndentLength < minIndent) return line;
		
		// Remove minIndent worth of whitespace
		let removed = 0;
		for (let i = 0; i < line.length && removed < minIndent; i++) {
			const char = line[i];
			if (char === '\t') {
				removed += 4; // Tab = 4 spaces
				if (removed >= minIndent) {
					return line.slice(i + 1);
				}
			} else if (char === ' ') {
				removed++;
				if (removed >= minIndent) {
					return line.slice(i + 1);
				}
			} else {
				// Non-whitespace character encountered before removing enough
				// This shouldn't happen, but return the line as-is
				return line;
			}
		}
		
		return line;
	});
	
	// Join lines and trim leading/trailing whitespace
	return dedentedLines.join('\n').trim();
}

// Function to process code blocks in HTML content
// Converts <!--CODE:language-->...code...<!--/CODE--> patterns into Prism.js code blocks
function processCodeBlocks(htmlContent) {
	if (!htmlContent) return htmlContent;
	
	// Pattern to match: <!--CODE:language-->...code...<!--/CODE-->
	// Uses non-greedy matching ([\s\S]*?) to match across multiple lines
	const codeBlockPattern = /<!--CODE:(\w+)-->([\s\S]*?)<!--\/CODE-->/g;
	
	return htmlContent.replace(codeBlockPattern, (match, language, code) => {
		// Remove common indentation from the code block
		const dedentedCode = dedentCode(code);
		
		// Escape HTML entities in the code
		const escapedCode = dedentedCode
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
		
		// Return Prism.js formatted code block
		return `<pre><code class="language-${language}">${escapedCode}</code></pre>`;
	});
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
	'markov-chains': htmlMarkovChains,
	'accessibility-principles': htmlAccessibilityPrinciples,
	'accessibility-standards-compliance': htmlAccessibilityStandardsCompliance,
	'legal-requirements': htmlLegalRequirements,
	'fundamental-accessibility-practices': htmlFundamentalAccessibilityPractices,
	'accessibility-testing-evaluation': htmlAccessibilityTestingEvaluation,
	'accessible-ui-patterns': htmlAccessibleUiPatterns,
	'accessibility-for-developers': htmlAccessibilityForDevelopers,
	'accessibility-in-design-ux': htmlAccessibilityInDesignUx,
	'accessible-content-media': htmlAccessibleContentMedia,
	'accessibility-checklists': htmlAccessibilityChecklists
};

// Function to merge HTML content into pieces
function mergeHtmlIntoPieces(categories) {
	return categories.map(category => ({
		...category,
		pieces: category.pieces.map(piece => {
			const htmlKey = getHtmlKeyFromHref(piece.href);
			const htmlContent = htmlKey && htmlMap[htmlKey];
			
			// Process code blocks in the HTML content before setting rawHTML
			const processedHtml = htmlContent ? processCodeBlocks(htmlContent) : '';
			
			// Always set rawHTML: use processed HTML file if it exists, otherwise use empty string
			return {
				...piece,
				rawHTML: processedHtml || ''
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

