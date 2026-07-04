// Resolve a public/ asset path against Vite's base so the build works from a
// GitHub Pages subpath or a custom-domain root without changes.
export const asset = (path: string): string =>
  import.meta.env.BASE_URL.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
