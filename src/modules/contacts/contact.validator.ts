import { HTTPException } from 'hono/http-exception';
import { baseErrorResponse } from '../../core/base.reponse';
import { contactSchema, contactUpdateSchema } from './contact.schema'
import { validator } from 'hono/validator';

export const contactCreateValidator = validator('json', (value, c) => {

    const parsed = contactSchema.safeParse(value);

    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }

    return parsed.data;
});

export const contactUpdateValidator = validator('json', (value, c) => {

    const parsed = contactUpdateSchema.safeParse(value);
    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }
})
