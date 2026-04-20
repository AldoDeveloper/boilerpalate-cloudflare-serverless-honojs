import { validator } from "hono/validator";
import { contactFormParamId } from "./contact.form.schema";
import { baseErrorResponse } from "../../core/base.reponse";

export const contactFormValidatorParamId = validator('param', (value, c) => {

    const parsed = contactFormParamId.safeParse(value);

    if(!parsed.success){
         c.status(400);
         const result = baseErrorResponse({ errors: JSON.parse(parsed.error.message) })
         return c.json(result);
    }
    
    return parsed.data;
})