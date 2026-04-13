import * as z from 'zod'

export const certificationSchema = z.object({
    name: z.string().min(2),
    issuer: z.string().min(2),
    issue_date: z.string().optional(),
    credential_url: z.string().url().optional().or(z.literal('')),
    description: z.string().optional()
});

export const certificationUpdateSchema = z.object({
    name: z.string().optional(),
    issuer: z.string().optional(),
    issue_date: z.string().optional(),
    credential_url: z.string().url().optional().or(z.literal('')),
    description: z.string().optional()
});
