import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function EmergencyHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="bg-accent-500/10 p-3 rounded-xl">
          <AlertCircle className="h-6 w-6 text-accent-500 animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-medium text-foreground">Emergency Response</h2>
          <p className="text-muted-foreground">Select service type</p>
        </div>
      </div>
    </div>
  );
}