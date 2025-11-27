'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type ConfidenceLevel = 'Low' | 'Medium' | 'High';
type RiskLevel = 'Low' | 'Moderate' | 'High';

const riskKeywords = ['threat', 'weapon', 'violence', 'rape', 'assault', 'danger', 'emergency'];

const getConfidence = (length: number): ConfidenceLevel => {
  if (length < 50) return 'Low';
  if (length < 150) return 'Medium';
  return 'High';
};

const getRisk = (text: string): RiskLevel => {
  const words = text.toLowerCase().split(/\s+/);
  const foundKeywords = words.filter(word => riskKeywords.includes(word.replace(/[.,!?;:]/g, '')));
  
  if (foundKeywords.length > 0) return 'High';
  return 'Low';
};


export function CaseConfidenceCard({ description }: { description: string }) {
  const [confidence, setConfidence] = useState<ConfidenceLevel>('Low');
  const [risk, setRisk] = useState<RiskLevel>('Low');

  useEffect(() => {
    setConfidence(getConfidence(description.length));
    setRisk(getRisk(description));
  }, [description]);

  const confidenceData: Record<ConfidenceLevel, { color: string; text: string }> = {
    Low: { color: 'text-destructive', text: 'More detail needed for a good analysis.' },
    Medium: { color: 'text-yellow-500', text: 'Good start. More details improve accuracy.' },
    High: { color: 'text-green-500', text: 'Sufficient detail for initial analysis.' },
  };

  const riskData: Record<RiskLevel, { color: string; icon: React.ReactNode }> = {
    Low: { color: 'text-green-500', icon: <CheckCircle2 className="h-5 w-5" /> },
    Moderate: { color: 'text-yellow-500', icon: <AlertCircle className="h-5 w-5" /> },
    High: { color: 'text-destructive', icon: <AlertCircle className="h-5 w-5" /> },
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5" />
          Initial Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-semibold">Case Confidence Score</h3>
          <motion.div
            key={confidence}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <span className={cn('text-2xl font-bold', confidenceData[confidence].color)}>
              {confidence}
            </span>
          </motion.div>
          <p className="text-sm text-muted-foreground">{confidenceData[confidence].text}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Risk Assessment</h3>
           <motion.div
            key={risk}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <div className={cn(riskData[risk].color)}>{riskData[risk].icon}</div>
            <span className={cn('font-bold', riskData[risk].color)}>
              {risk}
            </span>
          </motion.div>
          {risk === 'High' && (
             <p className="text-sm text-destructive">
              Keywords suggesting high risk detected. If in immediate danger, contact emergency services.
            </p>
          )}
           {risk === 'Low' && (
             <p className="text-sm text-muted-foreground">
              No immediate risk keywords detected.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
