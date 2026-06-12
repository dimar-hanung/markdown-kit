# Markdown KIT

Chrome extension that renders markdown files from the current browser URL as formatted HTML.

Open any `.md` link on the web or a local markdown file in Chrome and read it with GitHub-style formatting, math, diagrams, and light/dark themes.

## Features

- **Automatic rendering** — intercepts `http://` and `https://` URLs ending in `.md` (and related extensions) and displays them in a dedicated viewer
- **Local files** — renders `file://` markdown when file access is enabled
- **GitHub-flavored markdown** — tables, task lists, fenced code blocks, and more via [marked](https://marked.js.org/)
- **Mermaid diagrams** — flowcharts, sequence diagrams, and other diagram types
- **KaTeX math** — inline and display math expressions
- **Themes** — light and dark modes with a toggle; defaults to your system preference

## Supported file extensions

`.md`, `.markdown`, `.mdown`, `.mkdn`, `.mdtxt`, `.mdtext`, `.mkd`, `.mdwn`

## Chrome Web Store

Markdown KIT can be published to the [Chrome Web Store](https://chrome.google.com/webstore). See [docs/CHROME_WEB_STORE.md](docs/CHROME_WEB_STORE.md) for the full checklist, listing copy, and packaging steps.

```bash
npm run package
```

Upload the zip from `dist/` in the [Developer Dashboard](https://chrome.google.com/webstore/devconsole).

## Install

### From source

1. Clone the repository:

   ```bash
   git clone https://github.com/dimar-hanung/markdown-kit.git
   cd markdown-kit
   ```

2. Install dependencies and copy vendored libraries:

   ```bash
   npm install
   npm run vendor
   ```

3. Open `chrome://extensions` in Chrome.

4. Enable **Developer mode**, then click **Load unpacked** and select the project folder.

5. For local markdown files, open the extension details and enable **Allow access to file URLs**.

## Usage

- **Web URLs** — navigate to any markdown file URL, for example `https://example.com/docs/readme.md`. The extension redirects to its built-in viewer.
- **Local files** — open a `.md` file from disk in Chrome (with file URL access enabled).

## Local demo

A sample server is included for testing over `http://`:

```bash
npm start
```

Then open [http://127.0.0.1:3456/example.md](http://127.0.0.1:3456/example.md) in Chrome with the extension loaded.

## Development

| Command        | Description                                      |
| -------------- | ------------------------------------------------ |
| `npm run vendor` | Copy marked, Mermaid, KaTeX, and CSS into `lib/` |
| `npm start`    | Serve sample markdown on port 3456               |

## Project structure

```
├── manifest.json      Extension manifest (Manifest V3)
├── background.js      Redirects http(s) markdown URLs to the viewer
├── content.js         Renders file:// markdown in place
├── viewer.html        Viewer page for remote markdown
├── theme.js           Light/dark theme handling
├── lib/               Vendored parser and diagram libraries
├── styles/            GitHub markdown CSS and viewer styles
└── samples/           Demo markdown and local test server
```