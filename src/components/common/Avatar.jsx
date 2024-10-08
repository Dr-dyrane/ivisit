// src/components/ui/Avatar.jsx
import React from 'react';

const Avatar = ({ children, className }) => (
  <div className={`w-16 h-16 border border-red-500/50 p-2 shadow-md rounded-full overflow-hidden bg-gray-200 hover:shadow-lg transition-shadow ${className}`}>
    {children}
  </div>
);

const AvatarImage = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-full h-full object-cover" />
);

const AvatarFallback = ({ alt }) => (
  <div className="flex items-center justify-center w-full h-full text-gray-500">
    {alt ? alt[0] : 'A'}
  </div>
);

export { Avatar, AvatarImage, AvatarFallback };
