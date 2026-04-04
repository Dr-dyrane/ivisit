import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getAppDownloadLink, getExpoGoInstallLink } from '@/constants/appLinks';
import PreviewBridge from './PreviewBridge';

interface PreviewBridgeContextValue {
  openPreviewBridge: () => void;
  previewCtaLabel: 'Try the App' | 'Open iVisit';
}

const PreviewBridgeContext = createContext<PreviewBridgeContextValue | null>(null);
const PREVIEW_STEP_KEY = 'ivisit-preview-step';
const PREVIEW_INSTALL_TS_KEY = 'ivisit-preview-install-ts';

export function PreviewBridgeProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [previewStep, setPreviewStep] = useState<'default' | 'installing' | 'ready'>(() => {
    if (typeof window === 'undefined') return 'default';
    const stored = window.localStorage.getItem(PREVIEW_STEP_KEY);
    return stored === 'installing' || stored === 'ready' ? stored : 'default';
  });

  const openPreviewBridge = useCallback(() => {
    setIsOpen(true);
  }, []);

  const updatePreviewStep = useCallback((step: 'default' | 'installing' | 'ready') => {
    setPreviewStep(step);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(PREVIEW_STEP_KEY, step);
    }
  }, []);

  const handleInstallExpo = useCallback(() => {
    updatePreviewStep('installing');
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(PREVIEW_INSTALL_TS_KEY, String(Date.now()));
    }
    window.open(getExpoGoInstallLink(), '_blank', 'noopener,noreferrer');
  }, [updatePreviewStep]);

  const handleOpenPreview = useCallback(() => {
    updatePreviewStep('ready');
    window.open(getAppDownloadLink('expo-preview'), '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  }, [updatePreviewStep]);

  useEffect(() => {
    const promoteInstallReturn = () => {
      if (typeof window === 'undefined') return;
      const storedStep = window.localStorage.getItem(PREVIEW_STEP_KEY);
      if (storedStep !== 'installing') return;

      const installStartedAt = Number(window.localStorage.getItem(PREVIEW_INSTALL_TS_KEY) || '0');
      if (!installStartedAt || Date.now() - installStartedAt < 1500) return;

      updatePreviewStep('ready');
      setIsOpen(true);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        promoteInstallReturn();
      }
    };

    window.addEventListener('focus', promoteInstallReturn);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', promoteInstallReturn);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [updatePreviewStep]);

  const value = useMemo(
    () => ({
      openPreviewBridge,
      previewCtaLabel: previewStep === 'ready' ? 'Open iVisit' : 'Try the App',
    }),
    [openPreviewBridge, previewStep]
  );

  return (
    <PreviewBridgeContext.Provider value={value}>
      {children}
      <PreviewBridge
        open={isOpen}
        onOpenChange={setIsOpen}
        onInstallExpo={handleInstallExpo}
        onOpenPreview={handleOpenPreview}
        mode={previewStep === 'ready' ? 'continue' : 'default'}
      />
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
