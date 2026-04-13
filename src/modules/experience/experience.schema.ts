import * as z from 'zod'

export const experienceSchema = z.object({
    company_name: z.string().min(2),
    position: z.string().min(2),
    employment_type: z.enum(['full_time', 'freelance', 'contract', 'internship']),
    location: z.string().optional(),
    is_remote: z.int().min(0).max(1).optional(),
    start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal('')),
    is_current: z.int().min(0).max(1).optional(),
    description: z.string().optional()
});

export const experienceUpdateSchema = z.object({
    company_name: z.string().optional(),
    position: z.string().optional(),
    employment_type: z.enum(['full_time', 'freelance', 'contract', 'internship']).optional(),
    location: z.string().optional(),
    is_remote: z.int().min(0).max(1).optional(),
    start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal('')),
    is_current: z.int().min(0).max(1).optional(),
    description: z.string().optional()
});
