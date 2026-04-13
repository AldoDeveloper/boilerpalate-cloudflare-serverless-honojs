import * as z from 'zod'

export const expertiseSchema = z.object({
    title: z.string().min(2),
    description: z.string().optional()
});

export const expertiseUpdateSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional()
});
