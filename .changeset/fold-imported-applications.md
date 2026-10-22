---
'zyzz': patch
---

Folded applications of imported styles in production graph compiles, and compiled a `cx` call or no-argument application spread alone onto a DOM element to a `className` attribute instead of a spread of frozen props. Imports whose modules evaluate first also dropped their initialization reads, so bundlers remove unread definitions and their runtime while a bare import keeps the module's stylesheet.
