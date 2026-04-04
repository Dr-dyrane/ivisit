// Centralized app download links - update once, use everywhere.
const ANDROID_PRODUCTION_UPDATE_URL =
  'exp://u.expo.dev/a3777b70-b973-4b3b-ba59-ed32bf5662e0/group/6d82a60c-ce2f-4b3f-af7f-bacb62397cb4';
const IOS_PRODUCTION_UPDATE_URL =
  'exp://u.expo.dev/a3777b70-b973-4b3b-ba59-ed32bf5662e0/group/ef8c4d5b-4938-4697-b4e8-14010a9965e9';

const ANDROID_PREVIEW_UPDATE_URL =
  'exp://u.expo.dev/a3777b70-b973-4b3b-ba59-ed32bf5662e0/group/0e7ee6f7-d581-4a03-a709-42a350bccc40';
const IOS_PREVIEW_UPDATE_URL =
  'exp://u.expo.dev/a3777b70-b973-4b3b-ba59-ed32bf5662e0/group/0e7ee6f7-d581-4a03-a709-42a350bccc40';
const IOS_EXPO_GO_STORE_URL = 'https://apps.apple.com/app/expo-go/id982107779';
const ANDROID_EXPO_GO_STORE_URL =
  'https://play.google.com/store/apps/details?id=host.exp.exponent';

const getClientPlatform = () => {
  if (typeof navigator === 'undefined') {
    return 'android';
  }

  const userAgent = navigator.userAgent || '';
  const isAppleMobile =
    /iPad|iPhone|iPod/i.test(userAgent) ||
    (/Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(userAgent);

  if (isAppleMobile) return 'ios';
  if (isAndroid) return 'android';
  return 'desktop';
};

const getPlatformExpoProductionLink = () => {
  const platform = getClientPlatform();

  if (platform === 'ios') return IOS_PRODUCTION_UPDATE_URL;
  if (platform === 'android') return ANDROID_PRODUCTION_UPDATE_URL;
  return ANDROID_PRODUCTION_UPDATE_URL;
};

const getPlatformExpoPreviewLink = () => {
  const platform = getClientPlatform();

  if (platform === 'ios') return IOS_PREVIEW_UPDATE_URL;
  if (platform === 'android') return ANDROID_PREVIEW_UPDATE_URL;
  return ANDROID_PREVIEW_UPDATE_URL;
};

export const APP_DOWNLOAD_LINKS = {
  // Expo production update links from 2026-03-06 production publishes.
  PRODUCTION: getPlatformExpoProductionLink(),

  // Preview Android artifact.
  PREVIEW: 'https://expo.dev/artifacts/eas/oCFJSVracfx3x9HHmkscN.apk',

  EXPO_PRODUCTION_ANDROID: ANDROID_PRODUCTION_UPDATE_URL,
  EXPO_PRODUCTION_IOS: IOS_PRODUCTION_UPDATE_URL,
  EXPO_PRODUCTION: getPlatformExpoProductionLink(),

  // Expo preview update links from the March 27, 2026 preview OTA publish.
  EXPO_PREVIEW_ANDROID: ANDROID_PREVIEW_UPDATE_URL,
  EXPO_PREVIEW_IOS: IOS_PREVIEW_UPDATE_URL,
  EXPO_PREVIEW: getPlatformExpoPreviewLink(),

  // Default to production.
  DEFAULT: getPlatformExpoProductionLink()
};

export const EXPO_GO_INSTALL_URL = 'https://expo.dev/go';

export const getExpoGoInstallLink = () => {
  const platform = getClientPlatform();

  if (platform === 'ios') return IOS_EXPO_GO_STORE_URL;
  if (platform === 'android') return ANDROID_EXPO_GO_STORE_URL;
  return EXPO_GO_INSTALL_URL;
};

export const isDesktopClient = () => getClientPlatform() === 'desktop';

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

export const openAppDownloadLink = (environment = 'production') => {
  if (typeof window === 'undefined') {
    return;
  }

  const url = getAppDownloadLink(environment);
  const isDeepLink = /^exp:\/\//i.test(url);

  if (isDeepLink) {
    if (!isDesktopClient()) {
      window.location.assign(url);
      return;
    }

    window.open(getExpoGoInstallLink(), '_blank', 'noopener,noreferrer');
    return;
  }

  window.open(url, '_blank', 'noopener,noreferrer');
};

export default APP_DOWNLOAD_LINKS;

