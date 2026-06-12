# Markdown KIT Demo

This file is rendered by the **Markdown KIT** Chrome extension when opened in the browser.

## Features

- Renders `.md` URLs automatically
- GitHub-flavored markdown
- Mermaid diagrams and KaTeX math
- Light and dark themes (follows system preference)

## Mermaid diagram

```mermaid
flowchart LR
  A[Markdown] --> B[marked]
  B --> C[HTML]
  C --> D[Mermaid]
```

## Mermaid colors

Per-node colors via `classDef` (Mermaid's recommended styling API):

```mermaid
flowchart LR
  A[Request] --> B{Approved?}
  B -->|Yes| C[Ship it]
  B -->|No| D[Revise]
  classDef decision fill:#f5f0ff,stroke:#7c3aed,color:#4c1d95
  classDef success fill:#ecfdf5,stroke:#059669,color:#064e3b
  classDef warning fill:#fef9c3,stroke:#ca8a04,color:#78350f
  class B decision
  class C success
  class D warning
```

Per-diagram palette via frontmatter `themeVariables` (requires `theme: base`):

```mermaid
---
config:
  theme: base
  themeVariables:
    primaryColor: "#ffe4e6"
    primaryBorderColor: "#e11d48"
    secondaryColor: "#dbeafe"
    secondaryBorderColor: "#2563eb"
    lineColor: "#64748b"
---
flowchart TD
  Start --> Process --> End
```

## Math

Inline: $E = mc^2$

Display:

$$\int_0^1 x^2 \, dx = \frac{1}{3}$$

## Code sample

```javascript
const greeting = "Hello, markdown!";
console.log(greeting);
// Dollar signs in code are not math: $x^2$
```

## Table

| Column | Value |
| ------ | ----- |
| URL    | Current browser tab |
| Parser | marked |

## List

1. Load the extension in `chrome://extensions`
2. Open this file in Chrome
3. See formatted output

> Enable **Allow access to file URLs** for local `file://` markdown files.
