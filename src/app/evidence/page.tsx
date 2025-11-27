import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Upload, Lock } from 'lucide-react';

export default function EvidencePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-2xl text-center">
        <Shield className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
          Evidence Vault
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Securely store and manage your evidence. All files are encrypted for
          your privacy and protection. This feature is under development.
        </p>
      </div>

      <Card className="mx-auto mt-12 max-w-lg">
        <CardHeader>
          <CardTitle>Feature Coming Soon</CardTitle>
          <CardDescription>
            The Evidence Vault will allow you to upload images, audio, and text
            documents.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 rounded-md border p-4">
            <Upload className="h-6 w-6 text-muted-foreground" />
            <div>
              <h3 className="font-semibold">Secure Upload</h3>
              <p className="text-sm text-muted-foreground">
                Upload files directly from your device.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-md border p-4">
            <Lock className="h-6 w-6 text-muted-foreground" />
            <div>
              <h3 className="font-semibold">End-to-End Encryption</h3>
              <p className="text-sm text-muted-foreground">
                Your evidence is encrypted before it leaves your device.
              </p>
            </div>
          </div>
          <Button className="w-full" disabled>
            Upload Evidence
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
