import { Suspense } from 'react';
import { getLawSections } from '@/lib/actions';
import { LawArticleCard } from '@/components/legalease/law-article-card';
import { SeverityAlert } from '@/components/legalease/severity-alert';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type ResultsPageProps = {
  searchParams: {
    issue?: string;
  };
};

async function AnalysisResults({ issue }: { issue: string }) {
  const result = await getLawSections(issue);

  if ('error' in result || !result.lawSections || result.lawSections.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Analysis Failed</AlertTitle>
        <AlertDescription>
          {result.error || 'Could not find relevant law sections for your issue.'}
          <div className="mt-4">
            <Button asChild variant="secondary">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back and Try Again
              </Link>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      {result.severityScore === 'high' && (
        <SeverityAlert />
      )}
      <div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight">
          Relevant Law Sections
        </h2>
        <p className="text-muted-foreground">
          Based on your description, here are the most relevant legal sections.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {result.lawSections.map((law, index) => (
          <LawArticleCard key={index} law={law} />
        ))}
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="space-y-8">
      <div className="h-10 w-1/3 animate-pulse rounded-md bg-muted" />
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}

export default function ResultsPage({ searchParams }: ResultsPageProps) {
  const issue = searchParams.issue || '';

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 max-w-4xl">
        <Button asChild variant="outline" size="sm" className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            New Analysis
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Your Legal Analysis
        </h1>
        <div className="mt-4 rounded-lg border bg-card p-4">
          <p className="font-semibold text-muted-foreground">Your issue:</p>
          <p className="mt-1 italic">"{issue}"</p>
        </div>
      </div>
      <Suspense fallback={<SkeletonLoader />}>
        <AnalysisResults issue={issue} />
      </Suspense>
    </div>
  );
}
