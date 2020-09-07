module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // if uploading to subfolder in domain, add it here, otherwise just use '' or '/'
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