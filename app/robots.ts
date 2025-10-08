import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/login', '/register', '/profile', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/login', '/register', '/profile', '/api/'],
      },
    ],
    sitemap: 'https://coincash.com/sitemap.xml',
  }
}
