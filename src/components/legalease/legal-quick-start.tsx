'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { templates as allTemplates } from '@/lib/data';
import Link from 'next/link';
import { Button } from '../ui/button';
import { FileText, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const jurisdictions = [
  'National',
  'Maharashtra',
  'Karnataka',
  'Delhi',
  'Tamil Nadu',
];

const faqs = {
  National: [
    {
      question: 'How to file a cybercrime complaint?',
      href: '/chatbot?q=How+to+file+a+cybercrime+complaint',
    },
    {
      question: 'What are my rights as a consumer?',
      href: '/chatbot?q=What+are+my+rights+as+a+consumer',
    },
    { question: 'What is an FIR?', href: '/chatbot?q=What+is+an+FIR' },
  ],
  Maharashtra: [
    {
      question: 'How to file a consumer complaint in Maharashtra?',
      href: '/chatbot?q=How+to+file+a+consumer+complaint+in+Maharashtra',
    },
    {
      question: 'What are the property registration laws in Mumbai?',
      href: '/chatbot?q=What+are+the+property+registration+laws+in+Mumbai',
    },
    {
      question: 'Understand the Maharashtra Rent Control Act',
      href: '/chatbot?q=Explain+the+Maharashtra+Rent+Control+Act',
    },
  ],
  Karnataka: [
    {
      question: 'How to get a property Khata in Bangalore?',
      href: '/chatbot?q=How+to+get+a+property+Khata+in+Bangalore',
    },
    {
      question: 'Labor laws for tech employees in Karnataka',
      href: '/chatbot?q=Labor+laws+for+tech+employees+in+Karnataka',
    },
    {
      question: 'Filing a domestic violence case in Karnataka',
      href: '/chatbot?q=Filing+a+domestic+violence+case+in+Karnataka',
    },
  ],
  Delhi: [
    {
      question: 'Understanding electricity subsidy in Delhi',
      href: '/chatbot?q=Understanding+electricity+subsidy+in+Delhi',
    },
    {
      question: 'What are the tenant verification rules in Delhi?',
      href: '/chatbot?q=What+are+the+tenant+verification+rules+in+Delhi',
    },
    {
      question: 'How to contest a traffic challan in Delhi?',
      href: '/chatbot?q=How+to+contest+a+traffic+challan+in+Delhi',
    },
  ],
  'Tamil Nadu': [
    {
      question: 'Property registration process in Chennai',
      href: '/chatbot?q=Property+registration+process+in+Chennai',
    },
    {
      question: 'What is the dowry prohibition act in Tamil Nadu?',
      href: '/chatbot?q=What+is+the+dowry+prohibition+act+in+Tamil+Nadu',
    },
    {
      question: 'How to apply for legal aid in Tamil Nadu?',
      href: '/chatbot?q=How+to+apply+for+legal+aid+in+Tamil+Nadu',
    },
  ],
};

const getTrendingTemplates = (jurisdiction: string) => {
  // Simple logic, can be replaced with actual analytics
  if (jurisdiction === 'National') {
    return allTemplates.filter((t) => ['fir', 'rti', 'deposit-notice'].includes(t.id));
  }
  return allTemplates.slice(0, 3);
};

export function LegalQuickStart() {
  const [jurisdiction, setJurisdiction] = useState(jurisdictions[0]);

  const trendingTemplates = getTrendingTemplates(jurisdiction);
  const relevantFaqs =
    faqs[jurisdiction as keyof typeof faqs] || faqs['National'];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Legal Quick-Start</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div>
          <label
            htmlFor="jurisdiction-select"
            className="mb-2 block text-sm font-medium text-muted-foreground"
          >
            Select Jurisdiction
          </label>
          <Select value={jurisdiction} onValueChange={setJurisdiction}>
            <SelectTrigger id="jurisdiction-select" className="w-full">
              <SelectValue placeholder="Select Jurisdiction" />
            </SelectTrigger>
            <SelectContent>
              {jurisdictions.map((j) => (
                <SelectItem key={j} value={j}>
                  {j}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold">Trending Templates</h3>
          <div className="space-y-3">
            {trendingTemplates.map((template) => (
              <Button
                key={template.id}
                variant="outline"
                className="w-full justify-start gap-3 text-left"
                asChild
              >
                <Link href="/templates">
                  <FileText className="h-5 w-5 text-secondary" />
                  <span className="flex-1">{template.name}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold">Popular Questions</h3>
          <div className="space-y-3">
            {relevantFaqs.map((faq, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start gap-3 text-left"
                asChild
              >
                <Link href={faq.href}>
                  <HelpCircle className="h-5 w-5 text-secondary" />
                  <span className="flex-1">{faq.question}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
