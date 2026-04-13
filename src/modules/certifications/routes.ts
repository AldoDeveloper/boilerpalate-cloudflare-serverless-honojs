import { Hono } from "hono";
import { create, findAll, findOne, remove, update } from "./certification.controller";
import { certificationCreateValidator, certificationUpdateValidator } from "./certification.validator";
import { CertificationService } from "./certification.service";
import { baseErrorResponse } from "../../core/base.reponse";

type CertificationVariables = {
    certificationService: CertificationService
}

const certification = new Hono<{ Variables: CertificationVariables }>().basePath('/certifications');

certification.use(async (c, next) => {
    c.set('certificationService', CertificationService.instance(c.env as any))
    await next()
})

certification.post('/', certificationCreateValidator, (c) => create(c, c.get('certificationService')));
certification.patch('/:id', certificationUpdateValidator, (c) => update(c, c.get('certificationService')));

certification.get('/', (c) => findAll(c, c.get('certificationService')));
certification.get('/:id', (c) => findOne(c, c.get('certificationService')));
certification.delete('/:id', (c) => remove(c, c.get('certificationService')));

certification.onError((err: any, c) => {
    const status = err?.status;
    c.status(status ?? 400);
    return c.json(
        baseErrorResponse({ errors: err.message })
    )
})

export default certification;
