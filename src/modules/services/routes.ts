import { Hono } from "hono";
import { create, findAll, findOne, remove, update } from "./service.controller";
import { serviceCreateValidator, serviceUpdateValidator } from "./service.validator";
import { ServiceService } from "./service.service";
import { baseErrorResponse } from "../../core/base.reponse";

type ServiceVariables = {
    serviceService: ServiceService
}

const service = new Hono<{ Variables: ServiceVariables }>().basePath('/services');

service.use(async (c, next) => {
    c.set('serviceService', ServiceService.instance(c.env as any))
    await next()
})

service.post('/', serviceCreateValidator, (c) => create(c, c.get('serviceService')));
service.patch('/:id', serviceUpdateValidator, (c) => update(c, c.get('serviceService')));

service.get('/', (c) => findAll(c, c.get('serviceService')));
service.get('/:id', (c) => findOne(c, c.get('serviceService')));
service.delete('/:id', (c) => remove(c, c.get('serviceService')));

service.onError((err: any, c) => {
    const status = err?.status;
    c.status(status ?? 400);
    return c.json(
        baseErrorResponse({ errors: err.message })
    )
})

export default service;
