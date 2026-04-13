import * as z from 'zod' 

export const userSchema = z.object({
    name: z.string().min(2),
    username: z.string().optional(),
    password: z.string(),
    email: z.email(),
    is_active: z.int().min(0).max(1)
});

export const userUpdateSchema = z.object({
    name: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    email: z.email().optional(),
    is_active: z.int().min(0).max(1).optional()
});