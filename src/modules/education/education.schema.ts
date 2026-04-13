import * as z from 'zod'

export const educationSchema = z.object({
    institution_name: z.string().min(2),
    education_level: z.enum(['high_school', 'diploma', 'bachelor', 'master', 'doctorate', 'bootcamp', 'course']),
    major: z.string().optional(),
    start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal('')),
    is_current: z.int().min(0).max(1).optional(),
    grade: z.string().optional(),
    description: z.string().optional()
});

export const educationUpdateSchema = z.object({
    institution_name: z.string().optional(),
    education_level: z.enum(['high_school', 'diploma', 'bachelor', 'master', 'doctorate', 'bootcamp', 'course']).optional(),
    major: z.string().optional(),
    start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal('')),
    is_current: z.int().min(0).max(1).optional(),
    grade: z.string().optional(),
    description: z.string().optional()
});
