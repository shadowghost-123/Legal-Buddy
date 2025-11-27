'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return 'G';
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <Button asChild variant="outline" size="sm" className="mb-6">
        <Link href="/home">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      <Card>
        <CardHeader className="text-center">
          <Avatar className="mx-auto h-24 w-24 border-4 border-primary">
            <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
            <AvatarFallback className="text-4xl">
              {getInitials(user.displayName, user.email)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-3xl">
            {user.displayName || 'Guest User'}
          </CardTitle>
          <CardDescription>{user.email || 'No email provided'}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4">
            <h3 className="text-sm font-medium text-muted-foreground">User ID</h3>
            <p className="break-words text-sm">{user.uid}</p>
          </div>
           <div className="rounded-md border p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Authentication Provider</h3>
            <p className="text-sm capitalize">{user.providerData[0]?.providerId.replace('.com', '') || 'Anonymous'}</p>
          </div>
          <div className="rounded-md border p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Account Created</h3>
            <p className="text-sm">
              {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
            </p>
          </div>
          <div className="rounded-md border p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Last Signed In</h3>
            <p className="text-sm">
              {user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString() : 'N/A'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
