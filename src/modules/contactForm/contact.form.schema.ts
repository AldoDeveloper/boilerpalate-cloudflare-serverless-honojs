import  * as z from "zod";

export const contactFormCreateSchema = z.object({
    name : z.string().min(2),
    email : z.email(),
    message : z.string()
});

export const contactFormUpdateSchema = z.object({
    name: z.string().min(2).optional(),
    email: z.email().optional(),
    message: z.string().optional()
});

export const contactFormParamId = z.object({
    id: z.uuid()
});