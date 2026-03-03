// Centralized app download links - update once, use everywhere.
const ANDROID_PREVIEW_UPDATE_URL =
  'https://expo.dev/accounts/dyrane/projects/ivisit/updates/c8356a20-a35c-40a9-a376-cd5e8bf499a7';
const IOS_PREVIEW_UPDATE_URL =
  'https://expo.dev/accounts/dyrane/projects/ivisit/updates/90259559-5534-4277-9b3d-049b1977b274';

const getPlatformExpoPreviewLink = () => {
  if (typeof navigator === 'undefined') {
    return ANDROID_PREVIEW_UPDATE_URL;
  }

  const userAgent = navigator.userAgent || '';
  const isIOS = /iPad|iPhone|iPod|Macintosh/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);

  if (isIOS) return IOS_PREVIEW_UPDATE_URL;
  if (isAndroid) return ANDROID_PREVIEW_UPDATE_URL;
  return ANDROID_PREVIEW_UPDATE_URL;
};

export const APP_DOWNLOAD_LINKS = {
  // Latest production Android artifact.
  PRODUCTION: 'https://expo.dev/artifacts/eas/2wRLES8VZmKPuqtBWCBQKN.apk',

  // Preview Android artifact.
  PREVIEW: 'https://expo.dev/artifacts/eas/2wRLES8VZmKPuqtBWCBQKN.apk',

  // Expo preview update links from 2026-03-03 publishes.
  EXPO_PREVIEW_ANDROID: ANDROID_PREVIEW_UPDATE_URL,
  EXPO_PREVIEW_IOS: IOS_PREVIEW_UPDATE_URL,
  EXPO_PREVIEW: getPlatformExpoPreviewLink(),

  // Default to production.
  DEFAULT: 'https://expo.dev/artifacts/eas/2wRLES8VZmKPuqtBWCBQKN.apk'
};

export const getAppDownloadLink = (environment = 'production') => {
  switch (environment.toLowerCase()) {
    case 'preview':
      return APP_DOWNLOAD_LINKS.PREVIEW;
    case 'production':
    case 'prod':
      return APP_DOWNLOAD_LINKS.PRODUCTION;
    case 'expo':
    case 'expo-preview':
      return getPlatformExpoPreviewLink();
    default:
      return APP_DOWNLOAD_LINKS.DEFAULT;
  }
};

export default APP_DOWNLOAD_LINKS;
