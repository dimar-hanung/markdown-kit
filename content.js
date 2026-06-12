const MARKDOWN_PATH =
  /\.(?:md|markdown|mdown|mkdn|mdtxt|mdtext|mkd|mdwn)(?:[?#].*)?$/i;

const RENDERED_ATTR = "data-md-viewer-rendered";

function isMarkdownUrl(url) {
  try {
    return MARKDOWN_PATH.test(new URL(url).pathname);
  } catch {
    return MARKDOWN_PATH.test(url);
  }
}

function getMarkdownSource() {
  const pre = document.querySelector("pre");
  if (pre) {
    return pre.textContent ?? "";
  }

  const bodyText = document.body?.textContent ?? "";
  if (bodyText.trim()) {
    return bodyText;
  }

  return document.documentElement.textContent ?? "";
}

async function renderWithSource(source) {
  const trimmed = source.trim();
  if (!trimmed) {
    return false;
  }

  const html = parseMarkdown(trimmed);
  if (html === null) {
    return false;
  }

  document.documentElement.setAttribute(RENDERED_ATTR, "true");

  document.title = decodeURIComponent(
    location.pathname.split("/").pop() || "Markdown"
  );

  document.body.innerHTML = `<article class="markdown-body md-viewer">${html}</article>`;
  await enhanceRenderedContent(document.querySelector(".md-viewer"));
  return true;
}

async function renderMarkdown() {
  if (document.documentElement.hasAttribute(RENDERED_ATTR)) {
    return false;
  }

  if (!isMarkdownUrl(location.href)) {
    return false;
  }

  const source = getMarkdownSource().trim();
  if (!source) {
    return false;
  }

  return renderWithSource(source);
}

async function boot() {
  await initTheme();
  const rendered = await renderMarkdown();
  if (rendered) {
    mountThemeToggle();
  }
}

boot();
