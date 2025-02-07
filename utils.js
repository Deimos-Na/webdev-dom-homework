export function escapeHTML(str) {
  return str
    .replaceAll("<", "&lt;")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

export function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, interval)
  })
}
