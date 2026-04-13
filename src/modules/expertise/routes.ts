import { Hono } from "hono";
import { create, findAll, findOne, remove, update } from "./expertise.controller";
import { expertiseCreateValidator, expertiseUpdateValidator } from "./expertise.validator";
import { ExpertiseService } from "./expertise.service";
import { baseErrorResponse } from "../../core/base.reponse";

type ExpertiseVariables = {
    expertiseService: ExpertiseService
}

const expertise = new Hono<{ Variables: ExpertiseVariables }>().basePath('/expertise');

expertise.use(async (c, next) => {
    c.set('expertiseService', ExpertiseService.instance(c.env as any))
    await next()
})

expertise.post('/', expertiseCreateValidator, (c) => create(c, c.get('expertiseService')));
expertise.patch('/:id', expertiseUpdateValidator, (c) => update(c, c.get('expertiseService')));

expertise.get('/', (c) => findAll(c, c.get('expertiseService')));
expertise.get('/:id', (c) => findOne(c, c.get('expertiseService')));
expertise.delete('/:id', (c) => remove(c, c.get('expertiseService')));

expertise.onError((err: any, c) => {
    const status = err?.status;
    c.status(status ?? 400);
    return c.json(
        baseErrorResponse({ errors: err.message })
    )
})

export default expertise;
