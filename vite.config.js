import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/ieeetest/',
    build: {
        outDir: 'docs'
    },
    plugins: [
        tailwindcss(),
        react()
    ],
})
