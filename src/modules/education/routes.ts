import { Hono } from "hono";
import { create, createMany, findAll, findOne, remove, update } from "./education.controller";
import { educationCreateValidator, educationCreateManyValidator, educationUpdateValidator } from "./education.validator";
import { EducationService } from "./education.service";
import { baseErrorResponse } from "../../core/base.reponse";

type EducationVariables = {
    educationService: EducationService
}

const education = new Hono<{ Variables: EducationVariables }>().basePath('/educations');

education.use(async (c, next) => {
    c.set('educationService', EducationService.instance(c.env as any))
    await next()
})

education.post('/', educationCreateValidator, (c) => create(c, c.get('educationService')));
education.post('/many', educationCreateManyValidator, (c) => createMany(c, c.get('educationService')));
education.patch('/:id', educationUpdateValidator, (c) => update(c, c.get('educationService')));

education.get('/', (c) => findAll(c, c.get('educationService')));
education.get('/:id', (c) => findOne(c, c.get('educationService')));
education.delete('/:id', (c) => remove(c, c.get('educationService')));

education.onError((err: any, c) => {
    const status = err?.status;
    c.status(status ?? 400);
    return c.json(
        baseErrorResponse({ errors: err.message })
    )
})

export default education;
