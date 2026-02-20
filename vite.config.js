import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // Use '/workflow-pro/' if building for GitHub Pages, otherwise use '/' for Vercel/local
    base: process.env.GITHUB_ACTIONS ? "/workflow-pro/" : "/",
    build: {
        chunkSizeWarningLimit: 1000,
    }
})
