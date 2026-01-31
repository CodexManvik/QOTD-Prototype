import { z } from 'zod';

export const submissionSchema = z.object({
    questionId: z.string().min(1, "Question ID is required"),
    code: z.string().min(1, "Source code is required"),
    language: z.string().min(1, "Language is required"),
    userOutput: z.string().optional()
});
