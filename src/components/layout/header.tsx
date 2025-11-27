'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Bot,
  FileText,
  LifeBuoy,
  Menu,
  Shield,
  Home,
  LogOut,
  LogIn,
  User as UserIcon,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from './logo';
import { useUser, useAuth, useDoc, useMemoFirebase, useFirestore } from '@/firebase';
import { signOut } from 'firebase/auth';
import { UserProfileCard } from '../legalease/user-profile-card';
import type { User as AppUser } from '@/lib/data';
import { doc } from 'firebase/firestore';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/chatbot', label: 'AI Chatbot', icon: Bot },
  { href: '/templates', label: 'Templates', icon: FileText },
  { href: '/evidence', label: 'Evidence Vault', icon: Shield },
  { href: '/resources', label: 'Resources', icon: LifeBuoy },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: appUser } = useDoc<AppUser>(userDocRef);

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/');
    }
  };

  const isAuthenticated = !!user;

  const NavLink = ({
    href,
    label,
    icon: Icon,
    isMobile = false,
  }: {
    href: string;
    label: string;
    icon: React.ElementType;
    isMobile?: boolean;
  }) => {
    const isActive = pathname === href;
    const Comp = isMobile ? SheetClose : 'div';
    return (
      <Comp>
        <Button
          variant={isActive ? 'secondary' : 'ghost'}
          asChild
          className="w-full justify-start"
        >
          <Link href={href} className="flex items-center gap-3">
            <Icon className="h-5 w-5 text-muted-foreground" />
            <span>{label}</span>
          </Link>
        </Button>
      </Comp>
    );
  };

  const getInitials = (name?: string | null) => {
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    if (user?.email) {
        return user.email.charAt(0).toUpperCase();
    }
    return 'G';
  };
  
  const displayName = appUser?.name || user?.displayName || 'Guest User';

  if (pathname === '/' && !user) {
    return null;
  }

  if (loading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
        </div>
      </header>
    );
  }

  if (!isAuthenticated) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <Button size="sm" asChild>
            <Link href="/">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Link>
          </Button>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="flex h-full flex-col p-6">
                <div className="mb-8">
                  <Logo />
                </div>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <NavLink key={item.href} {...item} isMobile />
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Desktop logo for centered view on mobile */}
            <div className="flex justify-center md:hidden">
              <Logo />
            </div>
          </div>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? 'outline' : 'ghost'}
                size="sm"
                asChild
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.photoURL || undefined} />
                      <AvatarFallback>
                        {getInitials(displayName)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <UserProfileCard user={user} appUser={appUser} />
                  <DropdownMenuSeparator />
                   <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/profile">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button size="sm" asChild>
                <Link href="/">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
    