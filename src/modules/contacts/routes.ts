import { Hono } from "hono";
import { create, findAll, findOne, remove, update } from "./contact.controller";
import { contactCreateValidator, contactUpdateValidator } from "./contact.validator";
import { ContactService } from "./contact.service";
import { baseErrorResponse } from "../../core/base.reponse";

type ContactVariables = {
    contactService: ContactService
}

const contact = new Hono<{ Variables: ContactVariables }>().basePath('/contacts');

contact.use(async (c, next) => {
    c.set('contactService', ContactService.instance(c.env as any))
    await next()
})

contact.post('/', contactCreateValidator, (c) => create(c, c.get('contactService')));
contact.patch('/:id', contactUpdateValidator, (c) => update(c, c.get('contactService')));

contact.get('/', (c) => findAll(c, c.get('contactService')));
contact.get('/:id', (c) => findOne(c, c.get('contactService')));
contact.delete('/:id', (c) => remove(c, c.get('contactService')));

contact.onError((err: any, c) => {
    const status = err?.status;
    c.status(status ?? 400);
    return c.json(
        baseErrorResponse({ errors: err.message })
    )
})

export default contact;
