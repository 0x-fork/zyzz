---
'zyzz': patch
---

Scoped the Vite plugin's discovery to the application's source. Discovery scans what `include` matches, otherwise the directories holding a `zyzz.config.*` module, otherwise the Vite root. The last two skip nested packages, such as a workspace's examples.

`include` now accepts globs and files, and replaces the default scope instead of adding directories beside the Vite root. Imported modules still compile below the Vite root and `include` directories.

```ts
// Scans the application's source and a linked package, which replaced `include: ['../library/src']`
zyzz({ include: ['src/**', '../library/src'] })
```
