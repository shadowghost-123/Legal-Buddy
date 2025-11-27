// src/ai/flows/legal-chatbot.ts
'use server';
/**
 * @fileOverview A legal assistance AI chatbot.
 *
 * - legalChatbot - A function that handles the chatbot interaction.
 * - LegalChatbotInput - The input type for the legalChatbot function.
 * - LegalChatbotOutput - The return type for the legalChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LegalChatbotInputSchema = z.object({
  query: z.string().describe('The user query about legal matters.'),
});
export type LegalChatbotInput = z.infer<typeof LegalChatbotInputSchema>;

const LegalChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type LegalChatbotOutput = z.infer<typeof LegalChatbotOutputSchema>;

export async function legalChatbot(input: LegalChatbotInput): Promise<LegalChatbotOutput> {
  return legalChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'legalChatbotPrompt',
  input: {schema: LegalChatbotInputSchema},
  output: {schema: LegalChatbotOutputSchema},
  prompt: `You are a legal assistant chatbot. Your task is to provide helpful and accurate information based on the user's query.
  Consider the context of provided legal articles when answering the question.
  Your response should be concise and easy to understand. If the question is not related to law, say so.

  User query: {{{query}}}
  `
});

const legalChatbotFlow = ai.defineFlow(
  {
    name: 'legalChatbotFlow',
    inputSchema: LegalChatbotInputSchema,
    outputSchema: LegalChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
