# Publish Markdown KIT to the Chrome Web Store

Publishing requires a Google developer account and manual steps in the Chrome Developer Dashboard. This guide walks through the process.

## Prerequisites

1. **Google account** with [2-Step Verification](https://myaccount.google.com/security) enabled (required).
2. **Chrome Web Store developer account** — register at [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole) ($5 one-time fee).
3. **Extension package** — build a zip with:

   ```bash
   npm run package
   ```

   Output: `dist/markdown-kit-1.0.0.zip`

4. **Screenshots** — at least one image (1280×800 or 640×400). See [store/listing.md](../store/listing.md).

## Step 1 — Build the upload zip

```bash
npm install
npm run vendor   # if lib/ is missing or outdated
npm run package
```

Upload only the zip from `dist/`. Do not upload `node_modules/`, `.git/`, or `samples/`.

## Step 2 — Create the store item

1. Go to [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole).
2. Click **Add new item**.
3. Upload `dist/markdown-kit-1.0.0.zip`.
4. Wait for the package validation to pass.

## Step 3 — Store listing

Copy text from [store/listing.md](../store/listing.md):

- Name, summary, description
- Category: **Productivity**
- Homepage: GitHub repo URL
- Privacy policy: `PRIVACY.md` on GitHub
- Upload icons (128×128 is taken from the package; add promotional images if desired)
- Upload screenshots

## Step 4 — Privacy practices

In the **Privacy** tab:

- Set the **single purpose** (see listing.md).
- Declare **website content** handling (markdown fetched from URLs you open).
- Confirm **limited use** certification.
- Set privacy policy URL:

  ```
  https://github.com/dimar-hanung/markdown-kit/blob/master/PRIVACY.md
  ```

## Step 5 — Distribution

- **Visibility:** Public
- **Regions:** All regions (or choose specific countries)
- **Pricing:** Free

## Step 6 — Submit for review

1. Add test instructions from `store/listing.md` if helpful for reviewers.
2. Click **Submit for review**.
3. Review usually completes within a few business days.

You will receive email when the item is approved or if changes are needed.

## After approval

- Publish immediately, or uncheck **Publish automatically** to publish manually later.
- Approved drafts must be published within **30 days** or they revert to draft.

## Updating the extension

1. Bump `version` in `manifest.json` and `package.json`.
2. Run `npm run package`.
3. Upload the new zip in the dashboard **Package** tab.
4. Submit for review again.

## Common review issues

| Issue | Fix |
| ----- | --- |
| Broad host permissions | Explain in Privacy tab that access is only used to fetch markdown URLs the user opens. |
| Missing privacy policy | Ensure `PRIVACY.md` is on GitHub and the URL is public in incognito. |
| Unclear single purpose | Use the single-purpose text from `store/listing.md`. |
| Missing screenshots | Add at least one screenshot of the rendered viewer. |

## Useful links

- [Publish in the Chrome Web Store](https://developer.chrome.com/docs/webstore/publish)
- [Program policies](https://developer.chrome.com/docs/webstore/program-policies)
- [Review process](https://developer.chrome.com/docs/webstore/review-process)
