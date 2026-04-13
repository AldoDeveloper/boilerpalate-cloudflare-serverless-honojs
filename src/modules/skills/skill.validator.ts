import { HTTPException } from 'hono/http-exception';
import { baseErrorResponse } from '../../core/base.reponse';
import { skillSchema, skillUpdateSchema } from './skill.schema'
import { validator } from 'hono/validator';

export const skillCreateValidator = validator('json', (value, c) => {

    const parsed = skillSchema.safeParse(value);

    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }

    return parsed.data;
});

export const skillUpdateValidator = validator('json', (value, c) => {

    const parsed = skillUpdateSchema.safeParse(value);
    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }
})
