import * as z from 'zod'

export const skillSchema = z.object({
    name: z.string().min(2),
    category: z.enum(['backend', 'frontend', 'devops', 'database', 'mobile', 'other']),
    level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).nullable(),
    level_percent: z.number().min(0).max(100),
    icon_svg: z.string().optional().or(z.literal('')),
    description: z.string().optional()
});

export const skillUpdateSchema = z.object({
    name: z.string().optional(),
    category: z.enum(['backend', 'frontend', 'devops', 'database', 'mobile', 'other']).optional(),
    level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
    level_percent: z.number().min(0).max(100).optional(),
    icon_svg: z.string().optional().or(z.literal('')),
    description: z.string().optional()
});
