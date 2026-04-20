import * as z from 'zod'

export const serviceSchema = z.object({
    title: z.string().min(2),
    description: z.string().optional(),
    icon: z.string(),
    price: z.string().optional()
});
    
export const serviceUpdateSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    price: z.string().optional()
});
