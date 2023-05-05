import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	main: {
		plugins: [externalizeDepsPlugin()]
	},
	preload: {
		plugins: [externalizeDepsPlugin()]
	},
	renderer: {
		resolve: {
			alias: {
				'@renderer': resolve(__dirname, 'src/renderer/src')
			}
		},
		plugins: [react()]
	},
	build: {
		rollupOptions: {
			input: {
				index: resolve(__dirname, 'index.html'),
				view: resolve(__dirname, 'view.html')
			}
		}
	}
})
