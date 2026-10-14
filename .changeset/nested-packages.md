---
'zyzz': patch
---

Skipped nested packages in the Vite plugin's discovery. A directory below a source directory that holds a `package.json`, such as a workspace example, is a separate project, so its unimported sources no longer contribute to the application's stylesheet and their imports no longer reach the dependency optimizer. Sources the application imports still compile. List a nested package in `include` to discover it.

```ts
zyzz({ include: ['packages/ui'] })
```
