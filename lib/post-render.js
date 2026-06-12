const MERMAID_SOURCE_ATTR = "data-mermaid-source";

function isDarkTheme() {
  const theme = document.documentElement.dataset.theme;
  if (theme === "dark") {
    return true;
  }
  if (theme === "light") {
    return false;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getMermaidThemeVariables() {
  if (isDarkTheme()) {
    return {
      darkMode: true,
      background: "#0d1117",
      primaryColor: "#1f3d5c",
      primaryTextColor: "#e6edf3",
      primaryBorderColor: "#388bfd",
      secondaryColor: "#1a3328",
      secondaryTextColor: "#e6edf3",
      secondaryBorderColor: "#3fb950",
      tertiaryColor: "#3d2a00",
      tertiaryTextColor: "#e6edf3",
      tertiaryBorderColor: "#d29922",
      lineColor: "#8b949e",
      textColor: "#e6edf3",
      mainBkg: "#1f3d5c",
      nodeBorder: "#388bfd",
      clusterBkg: "#161b22",
      clusterBorder: "#30363d",
      titleColor: "#e6edf3",
      edgeLabelBackground: "#161b22",
      noteBkgColor: "#3d2a00",
      noteTextColor: "#e6edf3",
      noteBorderColor: "#d29922",
    };
  }

  return {
    darkMode: false,
    background: "#ffffff",
    primaryColor: "#ddf4ff",
    primaryTextColor: "#1f2328",
    primaryBorderColor: "#0969da",
    secondaryColor: "#dafbe1",
    secondaryTextColor: "#1f2328",
    secondaryBorderColor: "#1a7f37",
    tertiaryColor: "#fff8c5",
    tertiaryTextColor: "#1f2328",
    tertiaryBorderColor: "#bf8700",
    lineColor: "#656d76",
    textColor: "#1f2328",
    mainBkg: "#ddf4ff",
    nodeBorder: "#0969da",
    clusterBkg: "#f6f8fa",
    clusterBorder: "#d1d9e0",
    titleColor: "#1f2328",
    edgeLabelBackground: "#ffffff",
    noteBkgColor: "#fff8c5",
    noteTextColor: "#1f2328",
    noteBorderColor: "#bf8700",
  };
}

function getMermaidConfig() {
  return {
    startOnLoad: false,
    theme: "base",
    themeVariables: getMermaidThemeVariables(),
  };
}

let mermaidInitialized = false;

function configureMermaid() {
  const config = getMermaidConfig();
  if (!mermaidInitialized) {
    mermaid.initialize(config);
    mermaidInitialized = true;
    return;
  }

  mermaid.mermaidAPI.updateSiteConfig(config);
}

function stashMermaidSource(node) {
  if (!node.getAttribute(MERMAID_SOURCE_ATTR)) {
    node.setAttribute(MERMAID_SOURCE_ATTR, node.textContent.trim());
  }
}

function restoreMermaidSource(node) {
  const source = node.getAttribute(MERMAID_SOURCE_ATTR);
  if (!source) {
    return;
  }

  node.textContent = source;
  node.removeAttribute("data-processed");
}

async function renderMermaidNodes(nodes) {
  configureMermaid();
  nodes.forEach(stashMermaidSource);
  await mermaid.run({ nodes, suppressErrors: true });
}

async function refreshMermaidDiagrams(rootElement) {
  const root = rootElement || document.querySelector(".md-viewer");
  if (!root) {
    return;
  }

  const nodes = root.querySelectorAll(".mermaid");
  if (nodes.length === 0) {
    return;
  }

  nodes.forEach(restoreMermaidSource);
  await renderMermaidNodes(nodes);
}

async function enhanceRenderedContent(rootElement) {
  if (!rootElement) {
    return;
  }

  const mermaidNodes = rootElement.querySelectorAll(".mermaid");
  if (mermaidNodes.length > 0) {
    try {
      await renderMermaidNodes(mermaidNodes);
    } catch {
      // Leave raw mermaid source visible on failure.
    }
  }

  try {
    renderMathInElement(rootElement, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
      throwOnError: false,
      ignoredTags: [
        "script",
        "noscript",
        "style",
        "textarea",
        "pre",
        "code",
      ],
    });
  } catch {
    // Leave math source text visible on failure.
  }
}
