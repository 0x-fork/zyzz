---
'zyzz': patch
---

Allow component import cycles when an imported module is proven to export only runtime values, such as function or class declarations. Preserve local style compilation and dependency tracking. Cyclic style values and cyclic re-exports remain unsupported.
