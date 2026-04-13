import { Hono } from "hono";
import { create, findAll, findOne, remove, update } from "./open-source.controller";
import { openSourceCreateValidator, openSourceUpdateValidator } from "./open-source.validator";
import { OpenSourceService } from "./open-source.service";
import { baseErrorResponse } from "../../core/base.reponse";

type OpenSourceVariables = {
    openSourceService: OpenSourceService
}

const openSource = new Hono<{ Variables: OpenSourceVariables }>().basePath('/open-sources');

openSource.use(async (c, next) => {
    c.set('openSourceService', OpenSourceService.instance(c.env as any))
    await next()
})

openSource.post('/', openSourceCreateValidator, (c) => create(c, c.get('openSourceService')));
openSource.patch('/:id', openSourceUpdateValidator, (c) => update(c, c.get('openSourceService')));

openSource.get('/', (c) => findAll(c, c.get('openSourceService')));
openSource.get('/:id', (c) => findOne(c, c.get('openSourceService')));
openSource.delete('/:id', (c) => remove(c, c.get('openSourceService')));

openSource.onError((err: any, c) => {
    const status = err?.status;
    c.status(status ?? 400);
    return c.json(
        baseErrorResponse({ errors: err.message })
    )
})

export default openSource;
