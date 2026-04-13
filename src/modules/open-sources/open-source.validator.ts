import { HTTPException } from 'hono/http-exception';
import { baseErrorResponse } from '../../core/base.reponse';
import { openSourceSchema, openSourceUpdateSchema } from './open-source.schema'
import { validator } from 'hono/validator';

export const openSourceCreateValidator = validator('json', (value, c) => {

    const parsed = openSourceSchema.safeParse(value);

    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }

    return parsed.data;
});

export const openSourceUpdateValidator = validator('json', (value, c) => {

    const parsed = openSourceUpdateSchema.safeParse(value);
    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }
})
