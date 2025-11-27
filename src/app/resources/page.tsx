import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { helplines, ngos } from '@/lib/data';
import { Phone, ExternalLink } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Helplines & Resources
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          If you need immediate assistance or further support, here are some
          important contacts and organizations.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Emergency Helplines</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {helplines.map((line) => (
            <Card key={line.number}>
              <CardHeader>
                <CardTitle>{line.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-start gap-4">
                <p className="text-3xl font-bold text-primary">{line.number}</p>
                <Button asChild>
                  <a href={`tel:${line.number}`}>
                    <Phone className="mr-2 h-4 w-4" /> Call Now
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">Support Organizations (NGOs)</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ngos.map((ngo) => (
            <Card key={ngo.name}>
              <CardHeader>
                <CardTitle>{ngo.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <a href={ngo.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Visit Website
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
