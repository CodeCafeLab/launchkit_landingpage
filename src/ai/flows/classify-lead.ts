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
      'Detailed description of the project, which may include company name.'
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
  prompt: `You are an AI assistant for a B2B lead generation agency from CodeCafe Labs, designed to classify leads from a contact form for a service called ClientBrew.

  Your goal is to determine if a lead is of High, Medium, or Low priority for LinkedIn outreach services.

  High Priority:
  - The user is from a B2B company (e.g., SaaS, Agency, Consulting).
  - Their company seems established and a good fit for premium services.
  - The lead provides a work email address.

  Medium Priority:
  - The user is a startup founder or from a smaller company.
  - Their request is a bit generic but they seem serious.

  Low Priority:
  - The request is very vague or seems like spam.
  - The email looks suspicious (e.g., generic gmail/hotmail for a company).
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
