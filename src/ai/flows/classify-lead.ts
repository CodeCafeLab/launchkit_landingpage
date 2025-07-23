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
  projectDetails: z.string().describe('Detailed description of the project.'),
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

export async function classifyLead(input: ClassifyLeadInput): Promise<ClassifyLeadOutput> {
  return classifyLeadFlow(input);
}

const classifyLeadPrompt = ai.definePrompt({
  name: 'classifyLeadPrompt',
  input: {schema: ClassifyLeadInputSchema},
  output: {schema: ClassifyLeadOutputSchema},
  prompt: `You are an AI assistant designed to classify leads based on their project details.

  Analyze the following lead information and classify its priority as High, Medium, or Low.
  Provide a classification reason based on the details provided.

  Lead Name: {{{name}}}
  Lead Email: {{{email}}}
  Project Details: {{{projectDetails}}}

  Ensure that your output matches the following schema: {{$output}}
  `, // add the output schema to the prompt to hint the model to return the formatted response
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
