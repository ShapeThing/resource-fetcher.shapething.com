// node:stream/web exports the WHATWG stream APIs, which are native in browsers
export const {
  ReadableStream,
  ReadableStreamDefaultController,
  ReadableByteStreamController,
  ReadableStreamBYOBReader,
  ReadableStreamDefaultReader,
  WritableStream,
  WritableStreamDefaultController,
  WritableStreamDefaultWriter,
  TransformStream,
  TransformStreamDefaultController,
  ByteLengthQueuingStrategy,
  CountQueuingStrategy,
} = globalThis
