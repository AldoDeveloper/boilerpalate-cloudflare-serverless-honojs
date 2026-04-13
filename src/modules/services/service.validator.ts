import { HTTPException } from 'hono/http-exception';
import { baseErrorResponse } from '../../core/base.reponse';
import { serviceSchema, serviceUpdateSchema } from './service.schema'
import { validator } from 'hono/validator';

export const serviceCreateValidator = validator('json', (value, c) => {

    const parsed = serviceSchema.safeParse(value);

    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }

    return parsed.data;
});

export const serviceUpdateValidator = validator('json', (value, c) => {

    const parsed = serviceUpdateSchema.safeParse(value);
    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }
})
