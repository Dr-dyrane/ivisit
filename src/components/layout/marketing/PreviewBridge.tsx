// PULLBACK NOTE: Replaced Expo Go bridge with App Store / Play Store download bridge
// OLD: ExpoMark logo, Expo Go install step, exp:// deep link "Open iVisit" step
// NEW: Apple / Google store download buttons via shared StoreLinks component
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { StoreLinks } from '@/components/ui/StoreLinks';

interface PreviewBridgeProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PreviewBridge({ isOpen, onOpenChange }: PreviewBridgeProps) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const content = (
    <div className="space-y-10 py-6">
      <p className="text-center text-base font-light text-muted-foreground leading-relaxed">
        Download iVisit from your app store and experience emergency healthcare at your fingertips.
      </p>

      <StoreLinks />

      <p className="text-[10px] text-center text-muted-foreground/40 uppercase tracking-[0.2em] font-black">
        Available on iOS & Android
      </p>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="border-0 bg-background/95 backdrop-blur-2xl p-8 rounded-t-[3rem]">
          <SheetHeader className="text-left mb-8">
            <SheetTitle className="text-3xl font-black tracking-[-0.05em] text-foreground">
              Get iVisit<span className="text-primary">.</span>
            </SheetTitle>
          </SheetHeader>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-0 bg-background/95 backdrop-blur-2xl p-10 rounded-[3rem] shadow-2xl shadow-black/10 dark:shadow-black/50">
        <DialogHeader className="text-center mb-8">
          <DialogTitle className="text-4xl font-black tracking-[-0.08em] text-foreground">
            Get iVisit<span className="text-primary">.</span>
          </DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
