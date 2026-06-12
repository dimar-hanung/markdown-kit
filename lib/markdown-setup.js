let configured = false;

function configureMarked() {
  if (configured) {
    return;
  }

  marked.use({
    renderer: {
      code({ text, lang }) {
        if (lang && lang.toLowerCase() === "mermaid") {
          return `<div class="mermaid">${text}</div>`;
        }
        return false;
      },
    },
  });

  configured = true;
}

function parseMarkdown(source) {
  configureMarked();

  try {
    return marked.parse(source, {
      gfm: true,
      breaks: false,
    });
  } catch {
    return null;
  }
}
