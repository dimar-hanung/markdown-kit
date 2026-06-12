function fileNameFromUrl(url) {
  try {
    return decodeURIComponent(new URL(url).pathname.split("/").pop() || "Markdown");
  } catch {
    return "Markdown";
  }
}

async function renderFromUrl(targetUrl) {
  const response = await fetch(targetUrl);
  const text = await response.text();
  const html = parseMarkdown(text);
  if (html === null) {
    throw new Error("Failed to parse markdown");
  }

  document.title = fileNameFromUrl(targetUrl);
  document.body.innerHTML = `<article class="markdown-body md-viewer">${html}</article>`;
  await enhanceRenderedContent(document.querySelector(".md-viewer"));
}

async function main() {
  await initTheme();

  const targetUrl = new URLSearchParams(location.search).get("url");

  if (!targetUrl) {
    document.body.innerHTML =
      '<p class="markdown-body md-viewer">Missing <code>?url=</code> parameter.</p>';
    mountThemeToggle();
    return;
  }

  try {
    await renderFromUrl(targetUrl);
  } catch (error) {
    document.body.innerHTML = `<pre class="markdown-body md-viewer">Failed to load markdown: ${String(error)}</pre>`;
  }

  mountThemeToggle();
}

main();
