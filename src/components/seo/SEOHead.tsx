import React from 'react';
import { useSEO } from '../../hooks/useSEO';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
  noIndex,
  structuredData
}) => {
  useSEO({
    title,
    description,
    keywords,
    ogImage,
    canonicalUrl,
    noIndex,
    structuredData
  });
  
  return null; // This component doesn't render anything
};

export default SEOHead;
