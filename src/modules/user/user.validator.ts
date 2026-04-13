import { HTTPException } from 'hono/http-exception';
import { baseErrorResponse } from '../../core/base.reponse';
import { userSchema, userUpdateSchema } from './user.schema'
import { validator } from 'hono/validator';

export const userCreateValidator = validator('json', (value, c) => {

    const parsed = userSchema.safeParse(value);

    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }

    return parsed.data;
});

export const userUpdateValidator = validator('json', (value, c) => {

    const parsed = userUpdateSchema.safeParse(value);
    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }
})