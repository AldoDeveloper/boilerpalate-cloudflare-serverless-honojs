import { HTTPException } from 'hono/http-exception';
import { baseErrorResponse } from '../../core/base.reponse';
import { experienceSchema, experienceUpdateSchema } from './experience.schema'
import { validator } from 'hono/validator';

export const experienceCreateValidator = validator('json', (value, c) => {

    const parsed = experienceSchema.safeParse(value);

    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }

    return parsed.data;
});

export const experienceCreateManyValidator = validator('json', (value, c) => {

    if(!Array.isArray(value)){
        c.status(400);
        const result = baseErrorResponse({ errors: [{ message: 'Request body must be an array' }] })
        return c.json(result);
    }

    const parsed = experienceSchema.array().safeParse(value);

    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }

    return parsed.data;
});

export const experienceUpdateValidator = validator('json', (value, c) => {

    const parsed = experienceUpdateSchema.safeParse(value);
    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }
})
