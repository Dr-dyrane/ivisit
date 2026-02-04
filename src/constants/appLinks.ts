// Centralized app download links - UPDATE ONCE, USE EVERYWHERE
export const APP_DOWNLOAD_LINKS = {
  // Latest production build with Apple-quality animations and bug fixes
  PRODUCTION: 'https://expo.dev/artifacts/eas/2wRLES8VZmKPuqtBWCBQKN.apk',

  // Preview build for testing - v1.0.4 with critical fixes
  PREVIEW: 'https://expo.dev/artifacts/eas/2wRLES8VZmKPuqtBWCBQKN.apk',

  // Expo preview link for app store distribution
  EXPO_PREVIEW: 'https://expo.dev/accounts/dyrane/projects/ivisit/updates/9b0578f4-0ca1-48a9-893b-686aba498a14',

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
