import { VitePWAOptions } from 'vite-plugin-pwa'

export const PWAConfig: VitePWAOptions = {
  registerType: 'autoUpdate',
  disable: false,
  includeAssets: undefined,
  includeManifestIcons: false,
  // strategies: 'injectManifest',
  injectManifest: {
    injectionPoint: undefined,
  },
  injectRegister: 'script',
  minify: false,
  devOptions: {
    enabled: false,
  },
  manifest: {
    theme_color: '#a074ff',
    background_color: '#f1ebf9',
    icons: [
      {
        purpose: 'maskable',
        sizes: '512x512',
        src: '/public/images/icons/icon512_maskable.png',
        type: 'image/png',
      },
      {
        purpose: 'any',
        sizes: '512x512',
        src: '/public/images/icons/icon512_rounded.png',
        type: 'image/png',
      },
    ],
    orientation: 'any',
    display: 'standalone',
    dir: 'ltr',
    lang: 'ru-RU',
    name: 'Dellive Standard PWA',
    short_name: 'Dellive PWA',
    start_url: './',
  },
  workbox: {
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: ({ url }): boolean => {
          const suffixes: string[] = ['.svg', '.png', '.jpg', '.woff2', '.webmanifest']
          return suffixes.some((suffix: string): boolean => url.pathname.endsWith(suffix))
        },
        handler: 'CacheFirst',
        options: {
          cacheName: 'cache-first',
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: ({ url }): boolean => {
          const suffixes: string[] = ['.html', '.css', '.js', '.ts']
          return suffixes.some((suffix: string): boolean => url.pathname.endsWith(suffix))
        },
        handler: 'NetworkFirst',
        options: {
          cacheName: 'network-first',
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
}
