import { HTTPException } from 'hono/http-exception';
import { baseErrorResponse } from '../../core/base.reponse';
import { educationSchema, educationUpdateSchema } from './education.schema'
import { validator } from 'hono/validator';

export const educationCreateValidator = validator('json', (value, c) => {

    const parsed = educationSchema.safeParse(value);

    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }

    return parsed.data;
});

export const educationCreateManyValidator = validator('json', (value, c) => {

    if(!Array.isArray(value)){
        c.status(400);
        const result = baseErrorResponse({ errors: [{ message: 'Request body must be an array' }] })
        return c.json(result);
    }

    const parsed = educationSchema.array().safeParse(value);

    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }

    return parsed.data;
});

export const educationUpdateValidator = validator('json', (value, c) => {

    const parsed = educationUpdateSchema.safeParse(value);
    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }
})
