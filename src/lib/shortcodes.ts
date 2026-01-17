export function parseShortcodes(content: string): string {
  let processed = content;

  // Handle {{<figure>}} shortcode
  processed = processed.replace(
    /\{\{<figure>\}\}([\s\S]*?)\{\{<\/figure>\}\}/g,
    (match, tableContent) => {
      if (tableContent.trim().includes("|")) {
        return convertMarkdownTableToHTML(tableContent);
      }
      return tableContent;
    },
  );

  // Handle generic shortcodes
  processed = processed.replace(/\{\{<(\w+)([^>]*?)>\}\}/g, "");
  processed = processed.replace(/\{\{<\/(\w+)>\}\}/g, "");

  return processed;
}

function convertMarkdownTableToHTML(markdown: string): string {
  const lines = markdown.trim().split("\n").filter((line) => line.trim());
  if (lines.length === 0) return "";

  let html =
    '<div class="overflow-x-auto my-6"><table class="min-w-full border-collapse" style="border: 1px solid var(--shadow-color);">\n';

  const headerLine = lines[0];
  if (headerLine && headerLine.includes("|")) {
    const headers = headerLine
      .split("|")
      .map((h) => h.trim())
      .filter((h) => h && !h.match(/^[-:]+$/));

    html += "  <thead>\n    <tr>\n";
    headers.forEach((header) => {
      html += `      <th style="border: 1px solid var(--shadow-color); padding: 8px; text-align: left; font-weight: 600;">${escapeHtml(header)}</th>\n`;
    });
    html += "    </tr>\n  </thead>\n";
  }

  html += "  <tbody>\n";
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line && line.includes("|") && !line.match(/^[\s|:-]+$/)) {
      const cells = line
        .split("|")
        .map((c) => c.trim())
        .filter((c) => c);

      html += "    <tr>\n";
      cells.forEach((cell) => {
        html += `      <td style="border: 1px solid var(--shadow-color); padding: 8px;">${escapeHtml(cell)}</td>\n`;
      });
      html += "    </tr>\n";
    }
  }
  html += "  </tbody>\n</table></div>";

  return html;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m] || m);
}








