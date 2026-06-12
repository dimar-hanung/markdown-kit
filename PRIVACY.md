# Privacy Policy — Markdown KIT

**Last updated:** June 13, 2026

Markdown KIT ("the extension") is a Chrome extension that renders markdown files in your browser. This policy describes what data the extension handles.

## Summary

Markdown KIT does not sell user data, show ads, or use analytics. Markdown content is fetched only from URLs you open and is rendered locally in your browser.

## Data the extension handles

### Theme preference

If you change the light/dark theme, the extension stores your choice (`light` or `dark`) in `chrome.storage.sync` so it persists across sessions and synced Chrome profiles. This is the only data the extension stores.

### Markdown content

When you open a markdown URL (`http://`, `https://`, or `file://`), the extension reads that file's content to render it. Processing happens on your device. The extension does not upload markdown content to our servers.

For remote markdown files, the extension fetches content from the same URL you navigated to, using your browser's normal network connection.

### Local files

For `file://` URLs, the extension reads the file from your computer after you enable **Allow access to file URLs** in Chrome. File contents are not transmitted to third parties.

## Third-party services

The viewer may request fonts from Google Fonts (`fonts.googleapis.com`) to display text. Google's privacy policy applies to those requests: https://policies.google.com/privacy

The extension bundles open-source libraries (marked, Mermaid, KaTeX) that run locally and do not send your content to their authors.

## Permissions

| Permission | Why it is used |
| ---------- | -------------- |
| `webNavigation` | Detect when you navigate to a markdown URL and open the viewer |
| `tabs` | Redirect the current tab to the markdown viewer |
| `storage` | Save your theme preference |
| `http://*/*`, `https://*/*` | Fetch markdown files from web URLs you open |
| `file:///*` | Render local markdown files when file access is enabled |

## Data sharing

We do not sell, rent, or trade user data. We do not use data for advertising or creditworthiness purposes.

## Children's privacy

The extension is not directed at children under 13.

## Changes

We may update this policy. Changes will be posted in the [GitHub repository](https://github.com/dimar-hanung/markdown-kit).

## Contact

Open an issue on GitHub: https://github.com/dimar-hanung/markdown-kit/issues
