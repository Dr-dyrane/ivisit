import {
  createContext,
  useCallback,
  useMemo,
  useContext,
  type ReactNode,
} from 'react';
import { openAppDownloadLink } from '@/constants/appLinks';

interface PreviewBridgeContextValue {
  openPreviewBridge: () => void;
  previewCtaLabel: 'Open iVisit';
}

const PreviewBridgeContext = createContext<PreviewBridgeContextValue | null>(null);

export function PreviewBridgeProvider({ children }: { children: ReactNode }) {
  const openPreviewBridge = useCallback(() => {
    openAppDownloadLink('production');
  }, []);

  const value = useMemo(
    () => ({
      openPreviewBridge,
      previewCtaLabel: 'Open iVisit',
    }),
    [openPreviewBridge]
  );

  return (
    <PreviewBridgeContext.Provider value={value}>
      {children}
    </PreviewBridgeContext.Provider>
  );
}

export function usePreviewBridge() {
  const context = useContext(PreviewBridgeContext);

  if (!context) {
    throw new Error('usePreviewBridge must be used within PreviewBridgeProvider');
  }

  return context;
}
