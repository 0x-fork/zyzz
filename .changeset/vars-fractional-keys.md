---
'zyzz': patch
---

Rejected fractional numeric variable keys, such as `spacing: { 0.5: '2px' }`, in the `defineConfig`, `defineVars`, and `extendVars` types. Dots separate variable references, so the runtime and the compiler already reject these keys with `Expected a nonempty variable key without dots or conditions.` Type checking now reports the same key at its declaration instead of at build time.
