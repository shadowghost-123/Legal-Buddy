import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { templates } from '@/lib/data';
import { FileText, Download } from 'lucide-react';

export default function TemplatesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Legal Document Templates
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Generate common legal documents with ease. Select a template to start,
          edit the details, and export as a PDF.
        </p>
      </div>

      <section className="mt-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button className="w-full" disabled>
                  <Download className="mr-2 h-4 w-4" /> Use Template (Coming Soon)
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
