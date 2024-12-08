import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full blur-lg opacity-50 animate-pulse"></div>
        <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}