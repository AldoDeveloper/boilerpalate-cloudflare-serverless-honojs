import { HTTPException } from 'hono/http-exception';
import { baseErrorResponse } from '../../core/base.reponse';
import { articleSchema, articleUpdateSchema } from './article.schema'
import { validator } from 'hono/validator';

export const articleCreateValidator = validator('json', (value, c) => {

    const parsed = articleSchema.safeParse(value);

    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }

    return parsed.data;
});

export const articleUpdateValidator = validator('json', (value, c) => {

    const parsed = articleUpdateSchema.safeParse(value);
    if(!parsed.success){
        c.status(400);
        const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
        return c.json(result);
    }
})
