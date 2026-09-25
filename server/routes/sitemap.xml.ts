function escapeXml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export default defineEventHandler(async (event) => {
  const urls = await collectSitemapUrls(event)

  const body = urls
    .map((url) => {
      const alternates = url.alternatives
        .map(alt => `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${escapeXml(alt.href)}" />`)
        .join('\n')
      return `  <url>\n    <loc>${escapeXml(SITE_URL + url.loc)}</loc>\n${alternates}\n  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>`

  setHeader(event, 'Content-Type', 'application/xml; charset=UTF-8')
  return xml
})
