import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
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
});
