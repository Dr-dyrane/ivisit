import {
  createContext,
  useCallback,
  useMemo,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { openAppDownloadLink } from '@/constants/appLinks';
import { PreviewBridge } from './PreviewBridge';

// PULLBACK NOTE: Replaced Expo bridge with App Store / Play Store bridge
// OLD: openExpoBridge opened Expo Go deep link flow
// NEW: openExpoBridge opens store download dialog
interface PreviewBridgeContextValue {
  openPreviewBridge: () => void;
  openExpoBridge: () => void;
  previewCtaLabel: 'Open iVisit';
}

const PreviewBridgeContext = createContext<PreviewBridgeContextValue | null>(null);

export function PreviewBridgeProvider({ children }: { children: ReactNode }) {
  const [isExpoOpen, setIsExpoOpen] = useState(false);

  const openPreviewBridge = useCallback(() => {
    // Landing page CTAs go directly to the web app
    openAppDownloadLink('production');
  }, []);

  const openExpoBridge = useCallback(() => {
    // Guided native experience
    setIsExpoOpen(true);
  }, []);

  const value = useMemo(
    () => ({
      openPreviewBridge,
      openExpoBridge,
      previewCtaLabel: 'Open iVisit' as const,
    }),
    [openPreviewBridge, openExpoBridge]
  );

  return (
    <PreviewBridgeContext.Provider value={value}>
      {children}
      <PreviewBridge isOpen={isExpoOpen} onOpenChange={setIsExpoOpen} />
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
