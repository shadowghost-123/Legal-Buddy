import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bookmark,
  ExternalLink,
  Gavel,
  Shield,
  Share2,
} from 'lucide-react';

// The AI flow returns snake_case, so we define a type for that
// before mapping it to a component-friendly prop.
type LawSection = {
    section_no: string;
    act_name: string;
    category: string;
    punishment: string;
    simple_explanation: string;
    official_text: string;
    keywords: string[];
}


type LawArticleCardProps = {
  law: LawSection;
};

export function LawArticleCard({ law }: LawArticleCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <Gavel className="h-8 w-8 text-primary" />
          <div className="flex-1">
            <CardTitle className="text-xl">{law.section_no}</CardTitle>
            <CardDescription>{law.act_name}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bookmark className="h-4 w-4" />
            <span className="sr-only">Bookmark</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div>
          <h4 className="font-semibold">What it means:</h4>
          <p className="text-sm text-muted-foreground">
            {law.simple_explanation}
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Potential Punishment:</h4>
          <p className="text-sm text-muted-foreground">{law.punishment}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {law.keywords.map((keyword, i) => (
            <Badge key={i} variant="secondary">
              {keyword}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2">
        <Button variant="outline">
          <ExternalLink className="mr-2 h-4 w-4" /> View Full Details
        </Button>
        <Button>
          <Shield className="mr-2 h-4 w-4" />
          Generate Complaint
        </Button>
      </CardFooter>
    </Card>
  );
}
