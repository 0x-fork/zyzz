---
'zyzz': patch
---

Scoped the Vite plugin's discovery to the application's source. Discovery scans the modules that `include` matches when it is set, otherwise the directories that hold a `zyzz.config.*` module, otherwise the Vite root. The `zyzz.config.*` search and the root scan skip nested packages, directories with their own `package.json` such as a workspace's examples. Modules the application imports still compile wherever they live.

`include` now accepts globs and files, and replaces the default scope instead of adding to the Vite root. A configuration that listed a linked package beside the Vite root lists both.

```ts
zyzz({ include: ['src/**', '../library/src'] })
```
