import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export default function ImageWithFallback({ 
  src, 
  alt, 
  fallbackSrc,
  className = '',
  ...props 
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!error) {
      setError(true);
    }
  };

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-primary-800/50 ${className}`}>
        {fallbackSrc ? (
          <img
            src={fallbackSrc}
            alt={alt}
            className={className}
            {...props}
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-4">
            <ImageOff className="w-8 h-8 text-primary-400 mb-2" />
            <span className="text-sm text-primary-400">Image not available</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
}