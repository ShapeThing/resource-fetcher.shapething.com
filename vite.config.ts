import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stdlibBrowser from 'node-stdlib-browser'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: [
      // More specific aliases must come before broader ones
      // readable-stream does require('process/') with trailing slash
      { find: 'process/', replacement: path.resolve(__dirname, 'node_modules/process/browser.js') },
      // node:stream/web exports WHATWG stream APIs, native in browsers
      { find: 'node:stream/web', replacement: path.resolve(__dirname, 'src/shims/node-stream-web.js') },
      // fs stub — fetch-blob imports fs but those paths aren't called in-memory
      { find: 'node:fs', replacement: path.resolve(__dirname, 'src/shims/node-fs.js') },
      { find: /^fs$/, replacement: path.resolve(__dirname, 'src/shims/node-fs.js') },
      // net stub — node-fetch imports isIP from net for referrer URL checks
      { find: 'node:net', replacement: path.resolve(__dirname, 'src/shims/node-net.js') },
      { find: /^net$/, replacement: path.resolve(__dirname, 'src/shims/node-net.js') },
      // Spread the rest of node-stdlib-browser aliases
      ...Object.entries(stdlibBrowser).map(([find, replacement]) => ({ find, replacement })),
    ],
  },
  define: {
    global: 'globalThis',
    process: {
      env: {},
      version: ''
    },
    'process.nextTick': 'setTimeout',
  },
})
