import { useEffect, useState } from 'react';
import ExpoMark from '@/components/ui/ExpoMark';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

interface PreviewBridgeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInstallExpo: () => void;
  onOpenPreview: () => void;
  mode?: 'default' | 'continue';
}

export default function PreviewBridge({
  open,
  onOpenChange,
  onInstallExpo,
  onOpenPreview,
  mode = 'default',
}: PreviewBridgeProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);

    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  const isContinueMode = mode === 'continue';

  const bridgeBody = (
      <div className="rounded-[2rem] bg-gradient-to-b from-background via-background to-secondary/15 p-6 sm:p-8">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/50 shadow-sm shadow-black/5 dark:bg-white/10 dark:shadow-black/20">
          <ExpoMark className="h-6 w-6" />
        </div>

        <div className="mt-6 text-left">
          {isMobile ? (
            <DrawerHeader className="p-0 text-left">
              <DrawerTitle className="text-2xl font-black tracking-[-0.04em] text-foreground">
                {isContinueMode ? 'Open iVisit' : 'Open iVisit preview'}
              </DrawerTitle>
              <DrawerDescription className="mt-3 text-base leading-relaxed text-muted-foreground">
                {isContinueMode ? 'Continue in Expo Go.' : 'Install Expo Go once to continue.'}
              </DrawerDescription>
            </DrawerHeader>
          ) : (
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-black tracking-[-0.04em] text-foreground">
                {isContinueMode ? 'Open iVisit' : 'Open iVisit preview'}
              </DialogTitle>
              <DialogDescription className="mt-3 text-base leading-relaxed text-muted-foreground">
                {isContinueMode ? 'Continue in Expo Go.' : 'Install Expo Go once to continue.'}
              </DialogDescription>
            </DialogHeader>
          )}
        </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {isContinueMode ? 'Ready when you are.' : 'One-time setup.'}
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <Button
          variant={isContinueMode ? 'ghost' : 'accent'}
          size="lg"
          onClick={onInstallExpo}
          className={`w-full rounded-full ${isContinueMode ? 'border-0 bg-secondary/35 text-foreground hover:bg-secondary/50 dark:bg-white/10 dark:hover:bg-white/15' : 'border-0'}`}
        >
          Install Expo Go
        </Button>
        <Button
          variant={isContinueMode ? 'accent' : 'ghost'}
          size="lg"
          onClick={onOpenPreview}
          className={`w-full rounded-full ${isContinueMode ? 'border-0' : 'bg-secondary/35 text-foreground hover:bg-secondary/50 dark:bg-white/10 dark:hover:bg-white/15'}`}
        >
          <ExpoMark className="h-5 w-5" />
          Open iVisit
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[92vh] rounded-t-[2rem] border-0 bg-background/95 p-0 shadow-[0_-30px_90px_rgba(15,23,42,0.22)] backdrop-blur-3xl dark:shadow-[0_-30px_90px_rgba(0,0,0,0.45)]">
          {bridgeBody}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-[2rem] border-0 bg-background/95 p-0 shadow-[0_30px_90px_rgba(15,23,42,0.2)] backdrop-blur-3xl dark:shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
        {bridgeBody}
      </DialogContent>
    </Dialog>
  );
}
