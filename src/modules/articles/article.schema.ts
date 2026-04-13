import * as z from 'zod'

export const articleSchema = z.object({
    title: z.string().min(2),
    slug: z.string().min(2),
    content_md: z.string().optional(),
    thumbnail_url: z.string().url().optional().or(z.literal('')),
    published: z.number().optional()
});

export const articleUpdateSchema = z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    content_md: z.string().optional(),
    thumbnail_url: z.string().url().optional().or(z.literal('')),
    published: z.number().optional()
});
