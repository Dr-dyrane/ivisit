// Centralized app download links - update once, use everywhere.
const ANDROID_PRODUCTION_UPDATE_URL =
  'exp://u.expo.dev/a3777b70-b973-4b3b-ba59-ed32bf5662e0/group/6d82a60c-ce2f-4b3f-af7f-bacb62397cb4';
const IOS_PRODUCTION_UPDATE_URL =
  'exp://u.expo.dev/a3777b70-b973-4b3b-ba59-ed32bf5662e0/group/ef8c4d5b-4938-4697-b4e8-14010a9965e9';

const ANDROID_PREVIEW_UPDATE_URL =
  'exp://u.expo.dev/a3777b70-b973-4b3b-ba59-ed32bf5662e0/group/fccf6bd0-5f99-47e5-96e4-dddc5f705da3';
const IOS_PREVIEW_UPDATE_URL =
  'exp://u.expo.dev/a3777b70-b973-4b3b-ba59-ed32bf5662e0/group/bc05fd1a-3d25-4681-8307-2c51500d8493';

const getPlatformExpoProductionLink = () => {
  if (typeof navigator === 'undefined') {
    return ANDROID_PRODUCTION_UPDATE_URL;
  }

  const userAgent = navigator.userAgent || '';
  const isIOS = /iPad|iPhone|iPod|Macintosh/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);

  if (isIOS) return IOS_PRODUCTION_UPDATE_URL;
  if (isAndroid) return ANDROID_PRODUCTION_UPDATE_URL;
  return ANDROID_PRODUCTION_UPDATE_URL;
};

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
  // Expo production update links from 2026-03-06 production publishes.
  PRODUCTION: getPlatformExpoProductionLink(),

  // Preview Android artifact.
  PREVIEW: 'https://expo.dev/artifacts/eas/2wRLES8VZmKPuqtBWCBQKN.apk',

  EXPO_PRODUCTION_ANDROID: ANDROID_PRODUCTION_UPDATE_URL,
  EXPO_PRODUCTION_IOS: IOS_PRODUCTION_UPDATE_URL,
  EXPO_PRODUCTION: getPlatformExpoProductionLink(),

  // Expo preview update links from 2026-03-06 publishes.
  EXPO_PREVIEW_ANDROID: ANDROID_PREVIEW_UPDATE_URL,
  EXPO_PREVIEW_IOS: IOS_PREVIEW_UPDATE_URL,
  EXPO_PREVIEW: getPlatformExpoPreviewLink(),

  // Default to production.
  DEFAULT: getPlatformExpoProductionLink()
};

export const getAppDownloadLink = (environment = 'production') => {
  switch (environment.toLowerCase()) {
    case 'preview':
      return APP_DOWNLOAD_LINKS.PREVIEW;
    case 'production':
    case 'prod':
      return APP_DOWNLOAD_LINKS.PRODUCTION;
    case 'expo-production':
      return getPlatformExpoProductionLink();
    case 'expo':
    case 'expo-preview':
      return getPlatformExpoPreviewLink();
    default:
      return APP_DOWNLOAD_LINKS.DEFAULT;
  }
};

export default APP_DOWNLOAD_LINKS;

