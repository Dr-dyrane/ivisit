import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: object;
}

export const useSEO = (seoData: SEOData = {}) => {
  const location = useLocation();
  
  useEffect(() => {
    const baseUrl = 'https://ivisit.ng';
    const currentPath = location.pathname;
    const fullUrl = `${baseUrl}${currentPath}`;
    
    // Default SEO data
    const defaultSEO = {
      title: 'iVisit — Emergency Medical Dispatch',
      description: 'Ultra-rapid emergency medical dispatch and coordination, built for real-time response.',
      keywords: 'emergency medical services, ambulance dispatch, hospital booking, medical emergency, nigeria healthcare',
      ogImage: `${baseUrl}/og-image.png`,
      canonicalUrl: fullUrl,
      noIndex: false
    };
    
    // Merge with provided SEO data
    const finalSEO = { ...defaultSEO, ...seoData };
    
    // Update document title
    document.title = finalSEO.title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: string) => {
      let tag: HTMLMetaElement | null = document.querySelector(
        property ? `meta[property="${property}"]` : `meta[name="${name}"]`
      );
      
      if (!tag) {
        tag = document.createElement('meta');
        if (property) {
          tag.setAttribute('property', property);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };
    
    // Update basic meta tags
    updateMetaTag('description', finalSEO.description);
    updateMetaTag('keywords', finalSEO.keywords);
    updateMetaTag('robots', finalSEO.noIndex ? 'noindex, nofollow' : 'index, follow');
    
    // Update Open Graph tags
    updateMetaTag('og:title', finalSEO.title, 'og:title');
    updateMetaTag('og:description', finalSEO.description, 'og:description');
    updateMetaTag('og:image', finalSEO.ogImage, 'og:image');
    updateMetaTag('og:url', finalSEO.canonicalUrl, 'og:url');
    updateMetaTag('og:type', 'website', 'og:type');
    
    // Update Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', finalSEO.title);
    updateMetaTag('twitter:description', finalSEO.description);
    updateMetaTag('twitter:image', finalSEO.ogImage);
    
    // Update canonical URL
    let canonicalLink: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', finalSEO.canonicalUrl);
    
    // Update structured data if provided
    if (finalSEO.structuredData) {
      let scriptTag: HTMLScriptElement | null = document.querySelector('script[type="application/ld+json"]');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(finalSEO.structuredData);
    }
    
  }, [location.pathname, seoData]);
};
