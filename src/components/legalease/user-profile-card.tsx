'use client';

import type { User as FirebaseAuthUser } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Mail, Phone, Briefcase } from 'lucide-react';
import type { User as AppUser } from '@/lib/data';

interface UserProfileCardProps {
  user: FirebaseAuthUser | null;
  appUser: AppUser | null;
}

export function UserProfileCard({ user, appUser }: UserProfileCardProps) {
  const getInitials = (name?: string | null) => {
    if (name) return name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'G';
  };
  
  const displayName = appUser?.name || user?.displayName || 'Guest User';
  const displayEmail = appUser?.email || user?.email;
  const displayPhone = appUser?.phoneNumber || user?.phoneNumber;
  const displayRole = appUser?.role;

  return (
    <div className="p-2">
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 border">
          <AvatarImage src={user?.photoURL || undefined} alt={displayName} />
          <AvatarFallback className="text-xl">
            {getInitials(displayName)}
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5">
          <p className="font-semibold">{displayName}</p>
          {displayEmail ? (
            <p className="text-sm text-muted-foreground">{displayEmail}</p>
          ) : <Skeleton className="h-5 w-32" />}
        </div>
      </div>
      <div className="mt-4 space-y-3 text-sm">
        {displayPhone && (
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{displayPhone}</span>
          </div>
        )}
         <div className="flex items-center gap-3">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            {displayRole ? <span>{displayRole}</span> : <Skeleton className="h-5 w-20" />}
          </div>
        <div className="flex items-center gap-3">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="truncate text-muted-foreground">{user?.uid}</span>
        </div>
      </div>
    </div>
  );
}
    