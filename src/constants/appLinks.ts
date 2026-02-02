// Centralized app download links - UPDATE ONCE, USE EVERYWHERE
export const APP_DOWNLOAD_LINKS = {
  // Latest production build with Apple-quality animations and bug fixes
  PRODUCTION: 'https://expo.dev/artifacts/eas/2wRLES8VZmKPuqtBWCBQKN.apk',

  // Preview build for testing - v1.0.4 with critical fixes
  PREVIEW: 'https://expo.dev/artifacts/eas/2wRLES8VZmKPuqtBWCBQKN.apk',

  // Default to production
  DEFAULT: 'https://expo.dev/artifacts/eas/2wRLES8VZmKPuqtBWCBQKN.apk'
};

// Helper function to get the current app download link
export const getAppDownloadLink = (environment = 'production') => {
  switch (environment.toLowerCase()) {
    case 'preview':
      return APP_DOWNLOAD_LINKS.PREVIEW;
    case 'production':
    case 'prod':
      return APP_DOWNLOAD_LINKS.PRODUCTION;
    default:
      return APP_DOWNLOAD_LINKS.DEFAULT;
  }
};

// For easy importing
export default APP_DOWNLOAD_LINKS;
