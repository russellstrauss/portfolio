import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@use "@/sass/vars" as *;
					@use "@/sass/mixins" as *;
					@use "@/sass/responsive" as *;
				`
			}
		}
	},
	base: process.env.NODE_ENV === 'production' ? 'https://portfolio.jrstrauss.net/' : '/',
	build: {
		outDir: 'dist',
		rollupOptions: {
			output: {
				entryFileNames: '[name].js',
				chunkFileNames: '[name].js',
				assetFileNames: '[name].[ext]'
			}
		}
	}
});

