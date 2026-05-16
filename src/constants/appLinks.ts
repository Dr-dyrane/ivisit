// Centralized app download links - update once, use everywhere.
// PULLBACK NOTE: Removed all Expo Go deep links (exp://u.expo.dev/...)
// OLD: Expo Go OTA deep links for preview/production
// NEW: Real App Store / Play Store links for production distribution
export const APP_WEB_URL = 'https://app.ivisit.ng';

// Real store links — gate-free, anyone can download
const IOS_APP_STORE_URL = 'https://apps.apple.com/app/ivisit/id6670428412';
const ANDROID_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.dyrane.ivisit';

export const getClientPlatform = () => {
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

export const isDesktopClient = () => getClientPlatform() === 'desktop';

/** Returns the platform-appropriate store link */
export const getStoreLink = () => {
  const platform = getClientPlatform();
  if (platform === 'ios') return IOS_APP_STORE_URL;
  return ANDROID_PLAY_STORE_URL;
};

export const APP_DOWNLOAD_LINKS = {
  WEB: APP_WEB_URL,
  PRODUCTION: APP_WEB_URL,
  IOS: IOS_APP_STORE_URL,
  ANDROID: ANDROID_PLAY_STORE_URL,
  STORE: getStoreLink(),
  DEFAULT: APP_WEB_URL
};

export const getAppDownloadLink = (environment = 'production') => {
  switch (environment.toLowerCase()) {
    case 'web':
    case 'app':
      return APP_WEB_URL;
    case 'store':
      return getStoreLink();
    case 'ios':
      return IOS_APP_STORE_URL;
    case 'android':
      return ANDROID_PLAY_STORE_URL;
    case 'production':
    case 'prod':
    default:
      return APP_WEB_URL;
  }
};

export const openAppDownloadLink = (environment = 'production') => {
  if (typeof window === 'undefined') {
    return;
  }

  const url = getAppDownloadLink(environment);
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const openStoreLink = () => {
  if (typeof window === 'undefined') {
    return;
  }
  window.open(getStoreLink(), '_blank', 'noopener,noreferrer');
};

export default APP_DOWNLOAD_LINKS;
