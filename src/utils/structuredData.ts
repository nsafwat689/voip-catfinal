/**
 * Structured Data (JSON-LD) for SEO
 * Helps search engines understand the content and context of the website
 */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VOIP CAT',
  url: 'https://voipcat.com',
  logo: 'https://voipcat.com/images/logo-fox.jpg',
  description: 'Enterprise-grade CRM, cybersecurity, and global networking solutions for businesses worldwide.',
  sameAs: [
    'https://www.linkedin.com/company/voipcat',
    'https://twitter.com/voipcat',
    'https://www.facebook.com/voipcat',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    telephone: '+1-XXX-XXX-XXXX',
    email: 'support@voipcat.com',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'Global',
  },
};

export const serviceSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Enterprise CRM Solutions',
    description: 'Cloud-based customer relationship management software for enterprises.',
    provider: {
      '@type': 'Organization',
      name: 'VOIP CAT',
    },
    areaServed: 'Worldwide',
    availableLanguage: 'en',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Cybersecurity Solutions',
    description: 'Managed security services and threat intelligence for enterprise networks.',
    provider: {
      '@type': 'Organization',
      name: 'VOIP CAT',
    },
    areaServed: 'Worldwide',
    availableLanguage: 'en',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Global Networking Solutions',
    description: 'Enterprise-grade network infrastructure and connectivity solutions.',
    provider: {
      '@type': 'Organization',
      name: 'VOIP CAT',
    },
    areaServed: 'Worldwide',
    availableLanguage: 'en',
  },
];

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'VOIP CAT',
  url: 'https://voipcat.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://voipcat.com/articles?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const articleSchema = (article: {
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  image?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  image: article.image || 'https://voipcat.com/images/og-articles.png',
  author: {
    '@type': 'Organization',
    name: article.author,
  },
  datePublished: article.date,
  articleBody: article.content,
});

/**
 * Function to inject JSON-LD script into the document head
 */
export function injectStructuredData(schema: any) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * Hook to inject multiple structured data schemas
 */
export function useStructuredData(schemas: any[]) {
  schemas.forEach(schema => {
    injectStructuredData(schema);
  });
}
