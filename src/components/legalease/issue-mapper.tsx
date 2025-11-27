'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { CaseConfidenceCard } from './case-confidence-card';
import { motion, AnimatePresence } from 'framer-motion';

const wizardSteps = [
  {
    step: 1,
    title: 'Who is involved?',
    label: 'Describe the people or parties involved in the situation.',
    placeholder: 'e.g., "Me, my landlord, and the property manager."',
    key: 'parties',
  },
  {
    step: 2,
    title: 'What happened?',
    label: 'Provide a chronological summary of the events.',
    placeholder: 'e.g., "On May 1st, I reported a leak. The landlord has not responded to my multiple follow-ups since..."',
    key: 'events',
  },
  {
    step: 3,
    title: 'What is your desired outcome?',
    label: 'What do you hope to achieve? Be as specific as possible.',
    placeholder: 'e.g., "I want to get my security deposit back and be compensated for the water damage to my belongings."',
    key: 'goal',
  },
];

export function IssueMapper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    parties: '',
    events: '',
    goal: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullIssue = Object.values(formData).join(' ');
    if (!fullIssue.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please describe your issue before analyzing.',
        variant: 'destructive',
      });
      return;
    }
    setIsSubmitting(true);
    router.push(`/results?issue=${encodeURIComponent(fullIssue)}`);
  };

  const progress = ((currentStep + 1) / wizardSteps.length) * 100;
  const currentStepData = wizardSteps[currentStep];

  const fullDescription = useMemo(() => {
    return `${formData.parties} ${formData.events} ${formData.goal}`;
  }, [formData]);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="flex flex-col gap-4 md:col-span-2">
        <div className="mb-2">
          <Progress value={progress} className="h-2" />
          <p className="mt-2 text-sm text-muted-foreground">
            Step {currentStep + 1} of {wizardSteps.length}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="flex flex-1 flex-col gap-4"
            >
              <div className="text-left">
                <h3 className="text-xl font-semibold font-headline">
                  {currentStepData.title}
                </h3>
              </div>
              <div className="grid w-full flex-1 items-start gap-1.5">
                <Label htmlFor={currentStepData.key} className="sr-only">
                  {currentStepData.label}
                </Label>
                <Textarea
                  id={currentStepData.key}
                  name={currentStepData.key}
                  placeholder={currentStepData.placeholder}
                  value={formData[currentStepData.key as keyof typeof formData]}
                  onChange={handleInputChange}
                  rows={8}
                  className="resize-none text-base"
                  disabled={isSubmitting}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-auto flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0 || isSubmitting}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            {currentStep < wizardSteps.length - 1 ? (
              <Button type="button" onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  'Analyzing...'
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Analyze with AI
                  </>
                )}
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Your privacy is important. This analysis is anonymous.
          </p>
        </form>
      </div>
      <div className="relative md:col-span-1">
        <CaseConfidenceCard description={fullDescription} />
      </div>
    </div>
  );
}
