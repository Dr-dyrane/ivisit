import React from 'react';
import { Radar, Activity, Clock } from 'lucide-react';

export default function EmergencyHeader() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="bg-primary/10 p-3 rounded-2xl border border-primary/20">
              <Radar className="h-6 w-6 text-primary animate-spin-slow" />
            </div>
            <div className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-black text-foreground tracking-tighter uppercase">Command Center</h2>
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Dispatch Sync</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end mb-1">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] font-black text-foreground tabular-nums">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} UTC
            </span>
          </div>
          <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-primary/10 border border-primary/20">Priority One</span>
        </div>
      </div>
    </div>
  );
}