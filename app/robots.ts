import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/*.json$'],
      },
    ],
    sitemap: 'https://pensiones-consulting.mx/sitemap.xml',
  };
}
