# Chrome Web Store listing copy

Use this text in the [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole).

## Store listing

### Name

Markdown KIT

### Summary (short description, max 132 characters)

Render markdown files in Chrome with GitHub styling, Mermaid diagrams, KaTeX math, and light/dark themes.

### Description

Markdown KIT turns raw markdown into a clean, readable page whenever you open a `.md` file in Chrome.

**What it does**

- Automatically renders web markdown URLs (`http://` and `https://`)
- Renders local markdown files when file URL access is enabled
- Supports GitHub-flavored markdown: tables, task lists, fenced code blocks, and more
- Draws Mermaid diagrams (flowcharts, sequence diagrams, and more)
- Renders KaTeX math (inline and display)
- Light and dark themes with a toggle; defaults to your system preference

**Supported extensions**

`.md`, `.markdown`, `.mdown`, `.mkdn`, `.mdtxt`, `.mdtext`, `.mkd`, `.mdwn`

**How to use**

1. Install the extension.
2. Open any markdown link on the web, or open a local `.md` file in Chrome.
3. For local files, enable **Allow access to file URLs** on the extension details page.

**Privacy**

Markdown KIT does not use analytics or ads. Your theme preference is stored locally in Chrome sync storage. Markdown content is processed on your device.

Source code: https://github.com/dimar-hanung/markdown-kit

### Category

Productivity

### Language

English

### Homepage URL

https://github.com/dimar-hanung/markdown-kit

### Privacy policy URL

https://github.com/dimar-hanung/markdown-kit/blob/master/PRIVACY.md

---

## Privacy tab

### Single purpose

Render markdown files opened in the browser as formatted HTML with diagrams, math, and readable styling.

### Data handling (check only what applies)

- **Website content** — Yes. When you open a markdown URL, the extension fetches that page's text to render it locally.
- **User activity** — No.
- **Personally identifiable information** — No.
- **Health, financial, authentication, location, web history** — No.

### Certification

- Uses data only for the extension's single purpose.
- Does not sell or transfer data for unrelated purposes.
- Does not use data for creditworthiness or lending.

---

## Permission justifications (if reviewers ask)

| Permission | Justification |
| ---------- | ------------- |
| `webNavigation` | Detect navigation to markdown file URLs so the viewer can open automatically. |
| `tabs` | Update the current tab to the built-in markdown viewer for web URLs. |
| `storage` | Persist the user's light/dark theme choice via `chrome.storage.sync`. |
| `http://*/*`, `https://*/*` | Fetch markdown content from the URL the user opened. Host access is limited to markdown file extensions in code. |
| `file:///*` | Render local markdown files when the user enables file URL access. |

---

## Test instructions (optional, for reviewers)

1. Install the extension.
2. Open a public markdown URL, for example: `https://raw.githubusercontent.com/dimar-hanung/markdown-kit/master/samples/example.md`
3. Confirm the page renders with headings, a Mermaid diagram, math, and a theme toggle in the corner.
4. (Optional) Enable **Allow access to file URLs**, then open a local `.md` file to verify `file://` rendering.

---

## Screenshots (you must add these)

Upload at least **one** screenshot (1280×800 or 640×400):

1. Open `samples/example.md` via the local server (`npm start`) or a hosted raw GitHub URL.
2. Capture the rendered page in light mode.
3. Toggle dark mode and capture a second screenshot (recommended).

Save screenshots in `store/screenshots/` before uploading to the dashboard.
