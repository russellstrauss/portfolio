module.exports = {
	// You also need to upload /.htaccess to the server root directory for routing to function correctly.
	publicPath: process.env.NODE_ENV === 'production' ? 'https://portfolio.jrstrauss.net/' : '/', // if uploading to subfolder in domain, add it here, otherwise just use '' or '/'. Also update main.js to match
	configureWebpack: {
		output: {
			filename: 'app.js'
		}
	},
	css: {
		loaderOptions: {
			sass: {
				additionalData: `
					@use "@/sass/vars" as *;
					@use "@/sass/mixins" as *;
					@use "@/sass/responsive" as *;
				`
			}
		}
	}
};