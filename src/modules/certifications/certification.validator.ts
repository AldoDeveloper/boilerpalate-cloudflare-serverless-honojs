import { HTTPException } from 'hono/http-exception';
import { baseErrorResponse } from '../../core/base.reponse';
import { certificationSchema, certificationUpdateSchema } from './certification.schema'
import { validator } from 'hono/validator';

export const certificationCreateValidator = validator('json', (value, c) => {

    const parsed = certificationSchema.safeParse(value);

    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }

    return parsed.data;
});

export const certificationUpdateValidator = validator('json', (value, c) => {

    const parsed = certificationUpdateSchema.safeParse(value);
    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }
})
