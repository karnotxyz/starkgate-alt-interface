import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*'
    },
    sitemap: 'https://yetanotherswap.com/sitemap.xml',
    host: 'https://yetanotherswap.com'
  };
}
