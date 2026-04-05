import react from "@vitejs/plugin-react";
import { defineConfig } from "electron-vite";
import { resolve } from "path";

export default defineConfig({
	main: {
		build: {
			rollupOptions: {
				external: [
					"better-sqlite3",
					"reflect-metadata",
					/^@nestjs\//,
					"typeorm",
					/^typeorm\//,
				],
			},
		},
	},
	preload: {
		build: {
			// Bundle deps into the preload script. ESM preload cannot resolve bare
			// `fp-ts/Option` (directory imports) from node_modules when left external.
			externalizeDeps: false,
			rollupOptions: {
				output: {
					// Top-level `await` in preload requires ESM output (not CJS).
					format: "es",
				},
			},
		},
	},
	renderer: {
		resolve: {
			alias: {
				"@renderer": resolve("src/renderer/src"),
				"@shared": resolve("src/shared"),
			},
		},
		plugins: [react()],
	},
});
