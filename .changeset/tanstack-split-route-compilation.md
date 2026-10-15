---
'zyzz': patch
---

Fix route-local styles in TanStack `?tsr-split` modules by compiling styles and lowering TypeScript namespaces before route splitting. Preserve JSX, source maps, and CSS delivery in development and production. Shared helpers extracted through `tsr-shared` still require an ordinary imported module when they depend on route-local namespaces.
