import * as z from 'zod'

export const contactSchema = z.object({
    type: z.enum(['github', 'linkedin', 'email', 'twitter', 'instagram', 'website', 'other']),
    url: z.string().url(),
    label: z.string().optional()
});

export const contactUpdateSchema = z.object({
    type: z.enum(['github', 'linkedin', 'email', 'twitter', 'instagram', 'website', 'other']).optional(),
    url: z.string().url().optional(),
    label: z.string().optional()
});
