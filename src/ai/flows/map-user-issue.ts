'use server';

/**
 * @fileOverview A flow to map a user's description of a legal issue to the top 3 relevant law sections, along with a severity score.
 *
 * - mapUserIssueToRelevantLawSections - A function that handles the issue mapping process.
 * - MapUserIssueToRelevantLawSectionsInput - The input type for the mapUserIssueToRelevantLawSections function.
 * - MapUserIssueToRelevantLawSectionsOutput - The return type for the mapUserIssueToRelevantLawSections function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MapUserIssueToRelevantLawSectionsInputSchema = z.object({
  issueDescription: z.string().describe('The user-provided description of their legal issue.'),
});
export type MapUserIssueToRelevantLawSectionsInput = z.infer<
  typeof MapUserIssueToRelevantLawSectionsInputSchema
>;

const LawSectionSchema = z.object({
  section_no: z.string().describe('The section number of the law.'),
  act_name: z.string().describe('The name of the act.'),
  category: z.string().describe('The category of the law.'),
  punishment: z.string().describe('The punishment associated with the law.'),
  simple_explanation:
    z.string().describe('A simple explanation of the law.'),
  official_text: z.string().describe('The official text of the law.'),
  keywords: z.array(z.string()).describe('Keywords associated with the law.'),
});

const MapUserIssueToRelevantLawSectionsOutputSchema = z.object({
  lawSections: z.array(LawSectionSchema).describe('The top 3 relevant law sections.'),
  severityScore: z
    .enum(['low', 'medium', 'high'])
    .describe('The severity score of the issue.'),
});
export type MapUserIssueToRelevantLawSectionsOutput = z.infer<
  typeof MapUserIssueToRelevantLawSectionsOutputSchema
>;

export async function mapUserIssueToRelevantLawSections(
  input: MapUserIssueToRelevantLawSectionsInput
): Promise<MapUserIssueToRelevantLawSectionsOutput> {
  return mapUserIssueToRelevantLawSectionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mapUserIssueToRelevantLawSectionsPrompt',
  input: {schema: MapUserIssueToRelevantLawSectionsInputSchema},
  output: {schema: MapUserIssueToRelevantLawSectionsOutputSchema},
  prompt: `You are an AI legal assistant. Given the following issue description, identify the top 3 most relevant law sections and a severity score.

Issue Description: {{{issueDescription}}}

Format your response as a JSON object with 'lawSections' (an array of the top 3 law sections) and 'severityScore' ('low', 'medium', or 'high').  Each law section should include: section_no, act_name, category, punishment, simple_explanation, official_text, and keywords.

Consider these keywords when determining severity: threat, weapon, violence, rape, assault. If any of these keywords are present, the severity should be 'high'. Otherwise, determine the severity based on the description.
`,
});

const mapUserIssueToRelevantLawSectionsFlow = ai.defineFlow(
  {
    name: 'mapUserIssueToRelevantLawSectionsFlow',
    inputSchema: MapUserIssueToRelevantLawSectionsInputSchema,
    outputSchema: MapUserIssueToRelevantLawSectionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
