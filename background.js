const MARKDOWN_PATH =
  /\.(?:md|markdown|mdown|mkdn|mdtxt|mdtext|mkd|mdwn)(?:[?#].*)?$/i;

function isMarkdownPageUrl(url) {
  if (!url || url.startsWith("chrome-extension://")) {
    return false;
  }

  if (url.includes("/viewer.html")) {
    return false;
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }
    return MARKDOWN_PATH.test(parsed.pathname);
  } catch {
    return false;
  }
}

function viewerUrlFor(targetUrl) {
  return `${chrome.runtime.getURL("viewer.html")}?url=${encodeURIComponent(targetUrl)}`;
}

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId !== 0) {
    return;
  }

  if (!isMarkdownPageUrl(details.url)) {
    return;
  }

  const nextUrl = viewerUrlFor(details.url);
  if (details.url === nextUrl) {
    return;
  }

  chrome.tabs.update(details.tabId, { url: nextUrl });
});
