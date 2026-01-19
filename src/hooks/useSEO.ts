import { useEffect } from 'react';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonical?: string;
}

export function useSEO(config: SEOConfig) {
  useEffect(() => {
    // Update title
    document.title = config.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      let tag = document.querySelector(
        property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      ) as HTMLMetaElement;

      if (!tag) {
        tag = document.createElement('meta');
        if (property) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Update standard meta tags
    updateMetaTag('description', config.description);
    if (config.keywords) {
      updateMetaTag('keywords', config.keywords);
    }

    // Update OpenGraph tags
    updateMetaTag('og:title', config.title, true);
    updateMetaTag('og:description', config.description, true);
    updateMetaTag('og:type', config.ogType || 'website', true);
    if (config.ogImage) {
      updateMetaTag('og:image', config.ogImage, true);
    }

    // Update Twitter tags
    updateMetaTag('twitter:title', config.title, true);
    updateMetaTag('twitter:description', config.description, true);
    updateMetaTag('twitter:card', config.twitterCard || 'summary_large_image', true);
    if (config.ogImage) {
      updateMetaTag('twitter:image', config.ogImage, true);
    }

    // Update canonical URL
    if (config.canonical) {
      let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.rel = 'canonical';
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.href = config.canonical;
    }
  }, [config]);
}
