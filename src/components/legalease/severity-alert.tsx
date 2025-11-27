'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { helplines } from '@/lib/data';
import { AlertTriangle, Phone } from 'lucide-react';

export function SeverityAlert() {
  return (
    <Alert variant="destructive" className="border-2">
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle className="text-xl font-bold">High Severity Issue Detected</AlertTitle>
      <AlertDescription>
        <p className="mb-4">
          Your description mentions keywords related to potential danger (e.g., threat, violence). If you are in immediate danger, please contact emergency services.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {helplines.slice(0, 2).map((line) => (
            <Button
              key={line.number}
              variant="destructive"
              className="justify-start bg-white text-destructive-foreground hover:bg-white/90"
              asChild
            >
              <a href={`tel:${line.number}`}>
                <Phone className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <div>{line.name}</div>
                  <div className="text-lg font-bold">{line.number}</div>
                </div>
              </a>
            </Button>
          ))}
        </div>
      </AlertDescription>
    </Alert>
  );
}
