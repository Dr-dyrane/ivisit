import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["vite.svg"], // Update this array to include only existing assets
			manifest: {
				name: "ivisit",
				short_name: "ivisit",
				description: "Emergency Medical Response",
				theme_color: "#000", // Default theme color
				icons: [
					{
						src: "vite.svg",
						sizes: "192x192",
						type: "image/svg+xml",
					},
					{
						src: "vite.png",
						sizes: "512x512",
						type: "image/svg+xml",
					},
				],
			},
		}),
	],
});
