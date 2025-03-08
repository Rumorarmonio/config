import { defineConfig } from 'vite'
import pugPlugin from 'vite-plugin-pug'
import fs from 'fs'
import Inspect from 'vite-plugin-inspect'

// const PAGES = findFilesWithExtension('.html')

const PAGES_DIR: string = `./`
const PAGES: string[] = fs.readdirSync(PAGES_DIR).filter((fileName: string): boolean =>
  fileName.endsWith('.html'),
)

console.log({ ...PAGES })

const options: any = { pretty: true }
const locals = { name: 'My Pug' }

export default defineConfig({
  plugins: [
    pugPlugin(options, locals),
    Inspect(),
    removeCrossOrigin(),
  ],
  server: {
    port: 1337,
  },
  base: './',
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      scripts: '/src/scripts',
      utils: '/src/scripts/utils',
      types: '/src/scripts/types',
      forms: '/src/scripts/forms',
      sliders: '/src/scripts/sliders',
      modals: '/src/scripts/modals',
      api: '/src/scripts/api',
      settings: '/src/scripts/settings',
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/app.[js|ts]',
        assetFileNames: 'assets/[ext]/app.[ext]',
        chunkFileNames: 'assets/[name].js',
      },
      input: {
        ...PAGES,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '@import "./_main.scss";',
      },
    },
  },
})

function removeCrossOrigin(): any {
  return {
    name: 'remove-crossorigin',
    transformIndexHtml(html: string): string {
      return html
        .replace(`type="module" crossorigin `, 'defer ')
        .replace(`crossorigin `, '')
    },
  }
}
