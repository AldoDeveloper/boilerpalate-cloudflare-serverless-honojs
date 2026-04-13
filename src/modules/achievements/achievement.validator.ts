import { HTTPException } from 'hono/http-exception';
import { baseErrorResponse } from '../../core/base.reponse';
import { achievementSchema, achievementUpdateSchema } from './achievement.schema'
import { validator } from 'hono/validator';

export const achievementCreateValidator = validator('json', (value, c) => {

    const parsed = achievementSchema.safeParse(value);

    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }

    return parsed.data;
});

export const achievementUpdateValidator = validator('json', (value, c) => {

    const parsed = achievementUpdateSchema.safeParse(value);
    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }
})
