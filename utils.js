export function escapeHTML(str) {
  return str
    .replaceAll('<', '&lt;')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
