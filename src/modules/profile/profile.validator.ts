import { HTTPException } from 'hono/http-exception';
import { baseErrorResponse } from '../../core/base.reponse';
import { profileSchema, profileUpdateSchema } from './profile.schema'
import { validator } from 'hono/validator';

export const profileCreateValidator = validator('json', (value, c) => {

    const parsed = profileSchema.safeParse(value);

    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }

    return parsed.data;
});

export const profileUpdateValidator = validator('json', (value, c) => {

    const parsed = profileUpdateSchema.safeParse(value);
    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }
})
