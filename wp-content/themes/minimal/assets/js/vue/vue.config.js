module.exports = {
	transpileDependencies:[/node_modules[/\\\\]vuetify[/\\\\]/], // calendar IE11
	publicPath: '',
	configureWebpack: {
		output: {
			filename: 'app.js'
		}
	},

	chainWebpack: config => {
		config.optimization.delete('splitChunks'); // disable vendor chunking

		if (config.plugins.has("extract-css")) { // statically name css output file
			const extractCSSPlugin = config.plugin("extract-css");
			extractCSSPlugin &&
			extractCSSPlugin.tap(() => [
				{
					filename: 'app.css'
				}
			]);
		}
	}
};