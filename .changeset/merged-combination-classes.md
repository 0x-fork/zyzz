---
'zyzz': patch
---

Merged each `cx` combination and folded wrapper chain whose local styles always apply together into one class in grouped output, dropping overridden declarations. Combinations whose nested blocks a later declaration only partly overrides keep their separate rules.
