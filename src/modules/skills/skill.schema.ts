import * as z from 'zod'

export const skillSchema = z.object({
    name: z.string().min(2),
    category: z.enum(['backend', 'frontend', 'devops', 'database', 'mobile', 'other']),
    level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
    description: z.string().optional()
});

export const skillUpdateSchema = z.object({
    name: z.string().optional(),
    category: z.enum(['backend', 'frontend', 'devops', 'database', 'mobile', 'other']).optional(),
    level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
    description: z.string().optional()
});
