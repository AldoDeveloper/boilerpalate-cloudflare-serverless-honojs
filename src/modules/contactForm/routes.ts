import { Hono } from "hono";
import { ContactFormService } from "./contact.form.service";
import { create, findAll, findOne, remove, update } from "./contact.form.controller";
import { contactFormCreateValidator, contactFormUpdateValidator } from "./contact.form.validator";
import { contactFormValidatorParamId } from "./contact.param.validator";
import { baseErrorResponse } from "../../core/base.reponse";

export interface IContactFormVar {
    serviceContactForm: ContactFormService
}

const contactForm = new Hono<{ Variables: IContactFormVar, Bindings: Cloudflare.Env }>().basePath('/contact-form');

contactForm.use(async (c, next) => {
    c.set("serviceContactForm", ContactFormService.instance(c.env))
    await next();
})

contactForm.get(
    '/',
    (c) => findAll(c, c.get('serviceContactForm'))
);

contactForm.get(
    '/:id',
    contactFormValidatorParamId,
    (c) => findOne(c, c.get('serviceContactForm'))
);

contactForm.post(
    '/',
    contactFormCreateValidator,
    (c) => create(c, c.get('serviceContactForm'))
);

contactForm.patch(
    '/:id',
    contactFormValidatorParamId,
    contactFormUpdateValidator,
    (c) => update(c, c.get('serviceContactForm'))
);

contactForm.delete(
    '/:id',
    contactFormValidatorParamId,
    (c) => remove(c, c.get('serviceContactForm'))
);

contactForm.onError((err: any, c) => {
    const status = err?.status;
    c.status(status ?? 400);
    return c.json(
        baseErrorResponse({ errors: err.message })
    )
})

export default contactForm;