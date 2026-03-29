// Stub for Node's net module in browser context.
// node-fetch uses isIP from net to check IP addresses in referrer URLs.
// In a browser, this code path is never reached for in-memory SPARQL queries.
export function isIP(input) { return 0 }
export function isIPv4(input) { return false }
export function isIPv6(input) { return false }
export default { isIP, isIPv4, isIPv6 }
