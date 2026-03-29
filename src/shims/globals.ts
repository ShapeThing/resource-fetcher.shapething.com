// Inject Node.js globals needed by browser polyfills
import { Buffer } from 'buffer'

declare global {
  interface Window {
    Buffer: typeof Buffer
  }
}

if (!globalThis.Buffer) {
  // @ts-ignore
  globalThis.Buffer = Buffer
}
