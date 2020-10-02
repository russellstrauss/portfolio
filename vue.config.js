module.exports = {
	// update htaccess
	publicPath: process.env.NODE_ENV === 'production' ? 'https://portfolio.jrstrauss.net/' : '/', // if uploading to subfolder in domain, add it here, otherwise just use '' or '/'. Also update main.js to match
	configureWebpack: {
		output: {
			filename: 'app.js'
		}
	},
	css: {
		loaderOptions: {
			sass: {
				data: `@import "@/sass/main.scss";`
			}
		}
	}
};