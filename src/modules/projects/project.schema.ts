import * as z from 'zod'

export const projectSchema = z.object({
    title: z.string().min(2),
    slug: z.string().min(2),
    description: z.string().optional(),
    content_md: z.string().optional(),
    thumbnail_url: z.string().optional(),
    demo_url: z.string().optional(),
    repo_url: z.string().optional(),
    tech_stacks: z.array(z.string()).optional() // comma-separated list of technologies used in the project save JSON array
});

export const projectUpdateSchema = z.object({
    title: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    content_md: z.string().optional(),
    thumbnail_url: z.string().optional(),
    demo_url: z.string().optional(),
    repo_url: z.string().optional(),
    tech_stacks: z.array(z.string()).optional() // comma-separated list of technologies used in the project save JSON array
});
