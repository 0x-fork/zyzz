---
'zyzz': patch
---

Added `--font`, `--px`, and `--rem` to `zyzz build` and `zyzz dev` for native targets. They pass the same `fonts` and `units` mappings the Metro adapter accepts, so a CLI native build can compile styles that author a `fontFamily` or `rem` lengths. Each is rejected for web builds, and a `--font` value without `<authored>=<registered>` fails before compiling.
