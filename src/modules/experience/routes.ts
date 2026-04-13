import { Hono } from "hono";
import { create, createMany, findAll, findOne, remove, update } from "./experience.controller";
import { experienceCreateValidator, experienceCreateManyValidator, experienceUpdateValidator } from "./experience.validator";
import { ExperienceService } from "./experience.service";
import { baseErrorResponse } from "../../core/base.reponse";

type ExperienceVariables = {
    experienceService: ExperienceService
}

const experience = new Hono<{ Variables: ExperienceVariables }>().basePath('/experiences');

experience.use(async (c, next) => {
    c.set('experienceService', ExperienceService.instance(c.env as any))
    await next()
})

experience.post('/', experienceCreateValidator, (c) => create(c, c.get('experienceService')));
experience.post('/many', (c) => createMany(c, c.get('experienceService')));
experience.patch('/:id', experienceUpdateValidator, (c) => update(c, c.get('experienceService')));

experience.get('/', (c) => findAll(c, c.get('experienceService')));
experience.get('/:id', (c) => findOne(c, c.get('experienceService')));
experience.delete('/:id', (c) => remove(c, c.get('experienceService')));

experience.onError((err: any, c) => {
    const status = err?.status;
    c.status(status ?? 400);
    return c.json(
        baseErrorResponse({ errors: err.message })
    )
})

export default experience;
