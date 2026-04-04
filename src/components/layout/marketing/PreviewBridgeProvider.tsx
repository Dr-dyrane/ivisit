import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  getExpoGoInstallLink,
  isDesktopClient,
  openAppDownloadLink,
} from '@/constants/appLinks';
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
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [previewStep, setPreviewStep] = useState<'default' | 'installing' | 'ready'>(() => {
    if (typeof window === 'undefined') return 'default';
    const stored = window.localStorage.getItem(PREVIEW_STEP_KEY);
    return stored === 'installing' || stored === 'ready' ? stored : 'default';
  });
  const isDesktopPreview = isDesktopClient();

  const openPreviewBridge = useCallback(() => {
    setCopyStatus('idle');
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
    openAppDownloadLink('expo-preview');
    setIsOpen(false);
  }, [updatePreviewStep]);

  const handleCopyPageLink = useCallback(async () => {
    if (typeof window === 'undefined') return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = window.location.href;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const didCopy = document.execCommand('copy');
        document.body.removeChild(textarea);

        if (!didCopy) {
          throw new Error('Copy failed');
        }
      }

      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
  }, []);

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
      previewCtaLabel:
        !isDesktopPreview && previewStep === 'ready' ? 'Open iVisit' : 'Try the App',
    }),
    [isDesktopPreview, openPreviewBridge, previewStep]
  );

  return (
    <PreviewBridgeContext.Provider value={value}>
      {children}
      <PreviewBridge
        open={isOpen}
        onOpenChange={setIsOpen}
        onInstallExpo={handleInstallExpo}
        onOpenPreview={handleOpenPreview}
        onCopyPageLink={handleCopyPageLink}
        copyStatus={copyStatus}
        mode={isDesktopPreview ? 'desktop' : previewStep === 'ready' ? 'continue' : 'default'}
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
