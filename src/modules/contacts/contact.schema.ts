import * as z from 'zod'

export const contactSchema = z.object({
    type: z.enum(['github', 'linkedin', 'email', 'twitter', 'instagram', 'website', 'other']),
    url: z.string().optional().nullable(),
    label: z.string()
});

export const contactUpdateSchema = z.object({
    type: z.enum(['github', 'linkedin', 'email', 'twitter', 'instagram', 'website', 'other']).optional(),
    url: z.string().optional().nullable(),
    label: z.string().optional()
});
