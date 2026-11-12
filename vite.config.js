import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
    base: mode === "production" ? "/swati-project-frontend/" : "/",
    plugins: [react()],
    test: {
        environment: "jsdom",
        setupFiles: "./src/setupTests.js",
        restoreMocks: true,
        clearMocks: true,
    },
}));
