import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
// Online staat de site op GitHub Pages onder /ecrn-web-site/ (BASE_PATH overschrijft dit, bv. "/" bij een eigen domein).
// `vite build --mode offline` maakt één zelfstandig HTML-bestand dat met dubbelklik opent (file://).
export default defineConfig(({ mode }) => ({
  base: mode === 'offline' ? './' : (process.env.BASE_PATH ?? '/ecrn-web-site/'),
  plugins: [react(), tailwindcss(), mode === 'offline' && viteSingleFile()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ...(mode === 'offline' && {
    build: { outDir: 'dist-offline', assetsInlineLimit: 100_000_000 },
  }),
}))
