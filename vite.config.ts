import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr({ svgrOptions: { icon: true } })],
    server: {
        port: 3000,
    },
    optimizeDeps: {
        include: ["antd"],
    },
    build: {
        rolldownOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        if (id.includes("ant-design")) return "ant-design";
                        return "vendor";
                    }
                    if (id.includes("react")) return "react";
                },
                chunkFileNames: "[name]-[hash].js",
            },
        },
    },
    resolve: {
        alias: {
            "@": "/src",
        },
    },
});
