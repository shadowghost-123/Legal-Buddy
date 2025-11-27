'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { IssueMapper } from '@/components/legalease/issue-mapper';
import { LegalQuickStart } from '@/components/legalease/legal-quick-start';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const features = [
  'AI-Powered Analysis',
  'Legal Templates',
  'Secure Evidence Vault',
  'Confidential & Anonymous',
];

export default function Home() {
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
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-primary md:text-5xl lg:text-6xl">
              Navigate Your Legal Concerns with Confidence
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
              Legal Buddy is your AI-powered companion for understanding complex
              legal situations. Describe your issue to get clear explanations,
              identify relevant laws, and access helpful resources—all in one
              place.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="h-full rounded-xl bg-card p-8 shadow-lg">
                <h2 className="mb-6 text-center text-3xl font-bold font-headline">
                  Analyze Your Issue
                </h2>
                <IssueMapper />
              </div>
            </div>
            <div>
              <LegalQuickStart />
            </div>
          </div>

          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold">Key Features</h3>
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center justify-center gap-3 md:justify-start"
                >
                  <BadgeCheck className="h-6 w-6 text-secondary" />
                  <span className="font-semibold">{feature}</span>
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="mt-10">
              <Link href="/chatbot">
                Ask our AI Chatbot
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
