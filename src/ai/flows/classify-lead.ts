// This file uses server-side code.
'use server';

/**
 * @fileOverview Classifies and prioritizes leads submitted through the contact form.
 *
 * - classifyLead - A function that handles the lead classification process.
 * - ClassifyLeadInput - The input type for the classifyLead function.
 * - ClassifyLeadOutput - The return type for the classifyLead function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyLeadInputSchema = z.object({
  name: z.string().describe('The name of the lead.'),
  email: z.string().email().describe('The email address of the lead.'),
  projectDetails: z
    .string()
    .describe(
      'Detailed description of the project, which may include phone number and website.'
    ),
});
export type ClassifyLeadInput = z.infer<typeof ClassifyLeadInputSchema>;

const ClassifyLeadOutputSchema = z.object({
  priority: z
    .enum(['High', 'Medium', 'Low'])
    .describe('The priority of the lead (High, Medium, or Low).'),
  classificationReason: z
    .string()
    .describe('The reason for the lead classification.'),
});
export type ClassifyLeadOutput = z.infer<typeof ClassifyLeadOutputSchema>;

export async function classifyLead(
  input: ClassifyLeadInput
): Promise<ClassifyLeadOutput> {
  return classifyLeadFlow(input);
}

const classifyLeadPrompt = ai.definePrompt({
  name: 'classifyLeadPrompt',
  input: {schema: ClassifyLeadInputSchema},
  output: {schema: ClassifyLeadOutputSchema},
  prompt: `You are an AI assistant for a digital marketing agency called CodecCafe, designed to classify leads from a contact form.

  Your goal is to determine if a lead is of High, Medium, or Low priority.

  High Priority:
  - The user has a clear business and a live website.
  - The user seems to have a budget or is asking about scaling/growth.
  - The project sounds urgent or they are looking to switch providers.

  Medium Priority:
  - The user has a business idea but maybe not a live website yet.
  - Their request is a bit generic (e.g., "I need marketing").
  - They provide a valid-looking phone number and email.

  Low Priority:
  - The request is very vague or seems like spam.
  - The email or website looks suspicious.
  - They are just kicking tires and asking for general information without project specifics.

  Analyze the following lead information and classify its priority. Provide a concise reason for your classification.

  Lead Name: {{{name}}}
  Lead Email: {{{email}}}
  Project Details: {{{projectDetails}}}

  Ensure that your output matches the following schema: {{$output}}
  `,
});

const classifyLeadFlow = ai.defineFlow(
  {
    name: 'classifyLeadFlow',
    inputSchema: ClassifyLeadInputSchema,
    outputSchema: ClassifyLeadOutputSchema,
  },
  async input => {
    const {output} = await classifyLeadPrompt(input);
    return output!;
  }
);
