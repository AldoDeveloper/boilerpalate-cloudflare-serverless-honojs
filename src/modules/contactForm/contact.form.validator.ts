import { validator } from "hono/validator";
import { contactFormCreateSchema, contactFormUpdateSchema } from "./contact.form.schema";
import { baseErrorResponse } from "../../core/base.reponse";

export const contactFormCreateValidator = validator('json', (value, c) => {
    
    const parsed = contactFormCreateSchema.safeParse(value);
    
    if (!parsed.success) {
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }

    return parsed.data;
});

export const contactFormUpdateValidator = validator('json', (value, c) => {
    
    const parsed = contactFormUpdateSchema.safeParse(value);

    if (!parsed.success) {
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }

    return parsed.data;
})