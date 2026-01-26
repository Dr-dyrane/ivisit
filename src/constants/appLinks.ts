// Centralized app download links - UPDATE ONCE, USE EVERYWHERE
export const APP_DOWNLOAD_LINKS = {
  // Latest production build with Google hospital verification
  PRODUCTION: 'https://expo.dev/preview/update?message=merge%3A+Complete+emergency+system+with+Google+hospital+verification%0A%0A-+Merge+preview+branch+into+master%0A-+Resolve+conflicts+in+pr&updateRuntimeVersion=1.0.0&createdAt=2026-01-26T20%3A43%3A50.986Z&slug=exp&projectId=a3777b70-b973-4b3b-ba59-ed32bf5662e0&group=5322f690-17ac-47a1-9abb-89c1599156a0',
  
  // Preview build for testing
  PREVIEW: 'https://expo.dev/preview/update?message=feat%3A+Complete+emergency+system+with+Google+hospital+verification+and+real-time+availability%0A%0A-+Add+Google+hospital+verification+with+%27CALL+911%27+UI+for+unverified+hospitals%0A-+Implement+status+field+filtering+%28only+show+available+hospitals%29%0A-+Fix+ambulance+availability+with+fallback+for+Google-imported+hospitals%0A-+Add+real-time+availability+tracking+system+with+migrations%0A-+Enhance+hospital+selection+with+proper+validation+and+error+messages%0A-+Update+service+type+counts+to+respect+status+and+mode%0A-+Add+comprehensive+TypeScript+definitions+for+new+fields%0A-+Implement+real-time+polling+and+WebSocket+subscriptions%0A%0ABREAKING+CHANGE%3A+Hospitals+without+status%3D%27available%27+will+be+hidden+from+results&updateRuntimeVersion=1.0.0&createdAt=2026-01-26T20%3A43%3A50.986Z&slug=exp&projectId=a3777b70-b973-4b3b-ba59-ed32bf5662e0&group=f78305c4-9700-452f-affe-4083e83c8c82',
  
  // Default to production
  DEFAULT: 'https://expo.dev/preview/update?message=merge%3A+Complete+emergency+system+with+Google+hospital+verification%0A%0A-+Merge+preview+branch+into+master%0A-+Resolve+conflicts+in+pr&updateRuntimeVersion=1.0.0&createdAt=2026-01-26T20%3A43%3A50.986Z&slug=exp&projectId=a3777b70-b973-4b3b-ba59-ed32bf5662e0&group=5322f690-17ac-47a1-9abb-89c1599156a0'
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
