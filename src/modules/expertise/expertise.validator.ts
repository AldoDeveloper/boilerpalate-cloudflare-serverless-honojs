import { HTTPException } from 'hono/http-exception';
import { baseErrorResponse } from '../../core/base.reponse';
import { expertiseSchema, expertiseUpdateSchema } from './expertise.schema'
import { validator } from 'hono/validator';

export const expertiseCreateValidator = validator('json', (value, c) => {

    const parsed = expertiseSchema.safeParse(value);

    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }

    return parsed.data;
});

export const expertiseUpdateValidator = validator('json', (value, c) => {

    const parsed = expertiseUpdateSchema.safeParse(value);
    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }
})
