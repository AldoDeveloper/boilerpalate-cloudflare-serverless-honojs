import * as z from 'zod'

export const achievementSchema = z.object({
    title: z.string().min(2),
    description: z.string().optional(),
    issuer: z.string().optional(),
    date: z.string().optional(),
    certificateUrl: z.string().optional(),
    imageUrl: z.string().optional(),
    category: z.string().optional(),
    status: z.enum(['verified', 'pending', 'in-progress']).optional()
});

export const achievementUpdateSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    issuer: z.string().optional(),
    date: z.string().optional(),
    certificateUrl: z.string().optional(),
    imageUrl: z.string().optional(),
    category: z.string().optional(),
    status: z.enum(['verified', 'pending', 'in-progress']).optional()
});
