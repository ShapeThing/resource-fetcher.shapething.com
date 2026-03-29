// Stub for Node's fs module in browser context.
// fetch-blob/from.js imports statSync, createReadStream, and promises from fs,
// but these code paths are never called when using speedy-memory (in-memory engine).

// Set Buffer global early — this chunk is a dependency of the vendor lib chunk,
// so it executes before vendor code that uses Buffer as a global.
import { Buffer as _Buffer } from 'buffer'
if (!globalThis.Buffer) globalThis.Buffer = _Buffer
export const statSync = () => { throw new Error('fs.statSync not available in browser') }
export const createReadStream = () => { throw new Error('fs.createReadStream not available in browser') }
export const promises = {
  stat: () => Promise.reject(new Error('fs.promises.stat not available in browser')),
  open: () => Promise.reject(new Error('fs.promises.open not available in browser')),
}
export default { statSync, createReadStream, promises }
