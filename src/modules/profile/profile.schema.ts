import * as z from 'zod'

export const profileSchema = z.object({
    full_name: z.string().min(2),
    username: z.string().min(2),
    email: z.string().email().optional().or(z.literal('')),
    headline: z.string().optional(),
    bio: z.string().optional(),
    avatar_url: z.string().url().optional().or(z.literal('')),
    resume_url: z.string().url().optional().or(z.literal('')),
    location: z.string().optional(),
    is_available: z.number().optional(),
    years_of_experience: z.number().optional()
});

export const profileUpdateSchema = z.object({
    full_name: z.string().optional(),
    username: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
    headline: z.string().optional(),
    bio: z.string().optional(),
    avatar_url: z.string().url().optional().or(z.literal('')),
    resume_url: z.string().url().optional().or(z.literal('')),
    location: z.string().optional(),
    is_available: z.number().optional(),
    years_of_experience: z.number().optional()
});
