// Centralized app download links - UPDATE ONCE, USE EVERYWHERE
export const APP_DOWNLOAD_LINKS = {
  // Latest production build with Apple-quality animations and bug fixes
  PRODUCTION: 'https://expo.dev/artifacts/eas/2wRLES8VZmKPuqtBWCBQKN.apk',

  // Preview build for testing - v1.0.4 with critical fixes
  PREVIEW: 'https://expo.dev/artifacts/eas/2wRLES8VZmKPuqtBWCBQKN.apk',

  // Expo preview link for app store distribution
  EXPO_PREVIEW: 'https://expo.dev/preview/update?message=refactor%3A+centralize+validation+logic+and+update+docs%0A%0A-+create+utils%2Fvalidation.js+to+host+shared+regex+and+logic%0A-+update+comp&updateRuntimeVersion=1.0.4&createdAt=2026-02-11T04%3A17%3A23.475Z&slug=exp&projectId=a3777b70-b973-4b3b-ba59-ed32bf5662e0&group=cce84fb1-1ee8-4535-93ce-94b5092bce63',

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
    case 'expo':
    case 'expo-preview':
      return APP_DOWNLOAD_LINKS.EXPO_PREVIEW;
    default:
      return APP_DOWNLOAD_LINKS.DEFAULT;
  }
};

// For easy importing
export default APP_DOWNLOAD_LINKS;
