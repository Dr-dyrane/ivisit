import React from 'react';
import { Smartphone, Download, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/Button';
import ExpoMark from '@/components/ui/ExpoMark';
import { getAppDownloadLinks } from '@/constants/appLinks';

interface PreviewBridgeProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PreviewBridge({ isOpen, onOpenChange }: PreviewBridgeProps) {
  const links = getAppDownloadLinks('preview');
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const content = (
    <div className="space-y-12 py-6">
      <div className="flex justify-center">
        <ExpoMark className="h-12 w-auto opacity-80" />
      </div>

      <div className="space-y-4">
        {/* Step 1: Install */}
        <div className="flex items-center justify-between p-6 rounded-3xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
          <div className="flex items-center gap-4">
            <Download className="w-5 h-5 text-primary/60" />
            <span className="text-sm font-medium text-foreground/80">Install Expo Go</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-[11px] uppercase tracking-widest font-black text-primary hover:bg-primary/10"
            onClick={() => window.open(links.expoGo, '_blank')}
          >
            Get App
          </Button>
        </div>

        {/* Step 2: Open */}
        <div className="p-1 rounded-[2rem] bg-gradient-to-b from-primary/20 to-transparent">
          <Button 
            variant="accent" 
            className="w-full h-16 rounded-[1.85rem] text-sm font-black uppercase tracking-widest shadow-2xl shadow-primary/20"
            onClick={() => window.location.assign(links.expoLink)}
          >
            Open iVisit
            <ExternalLink className="w-4 h-4 ml-3 opacity-60" />
          </Button>
        </div>
      </div>

      <p className="text-[10px] text-center text-muted-foreground/40 uppercase tracking-[0.2em] font-black">
        Native Staging Environment
      </p>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="border-0 bg-background/95 backdrop-blur-2xl p-8 rounded-t-[3rem]">
          <SheetHeader className="text-left mb-8">
            <SheetTitle className="text-3xl font-black tracking-[-0.05em] text-foreground">
              Enjoy App Experience<span className="text-primary">.</span>
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
            Enjoy iVisit<span className="text-primary"> Native.</span>
          </DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
