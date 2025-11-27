'use server';

import {
  legalChatbot,
} from '@/ai/flows/legal-chatbot';
import {
  mapUserIssueToRelevantLawSections,
  type MapUserIssueToRelevantLawSectionsOutput,
} from '@/ai/flows/map-user-issue';

export async function getLawSections(
  issueDescription: string
): Promise<MapUserIssueToRelevantLawSectionsOutput | { error: string }> {
  if (!issueDescription) {
    return { error: 'Issue description is required.' };
  }
  try {
    const result = await mapUserIssueToRelevantLawSections({ issueDescription });
    return result;
  } catch (error) {
    console.error('Error in getLawSections:', error);
    return {
      error: 'Failed to analyze the issue. The AI model may be unavailable.',
    };
  }
}

export async function getChatbotResponse(query: string): Promise<string> {
  if (!query) {
    return 'Please provide a query.';
  }
  try {
    const result = await legalChatbot({ query });
    return result.response;
  } catch (error) {
    console.error('Error in getChatbotResponse:', error);
    return "I'm sorry, I encountered an error. Please try again.";
  }
}
