import * as z from 'zod'

export const openSourceSchema = z.object({
    project_name: z.string().min(2),
    repo_url: z.string().url(),
    description: z.string().optional(),
    stars: z.number().optional()
});

export const openSourceUpdateSchema = z.object({
    project_name: z.string().optional(),
    repo_url: z.string().url().optional(),
    description: z.string().optional(),
    stars: z.number().optional()
});
