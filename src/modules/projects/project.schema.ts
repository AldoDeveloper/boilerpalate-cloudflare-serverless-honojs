import * as z from 'zod'

export const projectSchema = z.object({
    title: z.string().min(2),
    slug: z.string().min(2),
    description: z.string().optional(),
    content_md: z.string().optional(),
    thumbnail_url: z.string().url().optional().or(z.literal('')),
    demo_url: z.string().url().optional().or(z.literal('')),
    repo_url: z.string().url().optional().or(z.literal('')),
    tech_stacks: z.array(z.string()).optional() // comma-separated list of technologies used in the project save JSON array
});

export const projectUpdateSchema = z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    content_md: z.string().optional(),
    thumbnail_url: z.string().url().optional().or(z.literal('')),
    demo_url: z.string().url().optional().or(z.literal('')),
    repo_url: z.string().url().optional().or(z.literal('')),
    tech_stacks: z.array(z.string()).optional() // comma-separated list of technologies used in the project save JSON array
});
