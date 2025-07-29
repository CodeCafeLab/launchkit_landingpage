
'use server';

/**
 * @fileOverview Classifies and prioritizes leads submitted through the contact form for BizTrack Suite.
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
  phone: z.string().optional().describe('The phone number of the lead.'),
  projectDetails: z
    .string()
    .describe(
      'The message or project details provided by the lead.'
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
  prompt: `You are an AI assistant for BizTrack Suite, a web development agency. Your task is to classify incoming leads from the website's contact form.

  Your goal is to determine if a lead is of High, Medium, or Low priority.

  High Priority:
  - The project description is detailed and suggests a clear, well-funded project (e.g., "building a SaaS platform", "e-commerce marketplace").
  - The lead is from an established company or a serious startup.
  - They provide a work email and a phone number.

  Medium Priority:
  - The project is smaller in scope (e.g., "landing page", "small business website").
  - The request is a bit generic but seems serious.
  - The lead provides a personal email (gmail, etc.) but the request is solid.

  Low Priority:
  - The request is very vague, asking for "a price" without any details.
  - The message seems like spam or a job application.
  - They are just asking for general information without project specifics.

  Analyze the following lead information and classify its priority. Provide a concise reason for your classification.

  Lead Name: {{{name}}}
  Lead Email: {{{email}}}
  Phone Number: {{{phone}}}
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
