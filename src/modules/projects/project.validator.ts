import { HTTPException } from 'hono/http-exception';
import { baseErrorResponse } from '../../core/base.reponse';
import { projectSchema, projectUpdateSchema } from './project.schema'
import { validator } from 'hono/validator';

export const projectCreateValidator = validator('json', (value, c) => {

    const parsed = projectSchema.safeParse(value);

    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }

    return parsed.data;
});

export const projectUpdateValidator = validator('json', (value, c) => {

    const parsed = projectUpdateSchema.safeParse(value);
    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }
})
