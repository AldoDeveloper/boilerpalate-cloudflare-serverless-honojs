import { Hono } from "hono";
import user, { UserVariables } from "./user/routes";
import projects from "./projects/routes";
import experience from "./experience/routes";
import education from "./education/routes";
import skills from "./skills/routes";
import expertise from "./expertise/routes";
import certifications from "./certifications/routes";
import achievements from "./achievements/routes";
import services from "./services/routes";
import articles from "./articles/routes";
import contacts from "./contacts/routes";
import openSources from "./open-sources/routes";
import profile from "./profile/routes";
import { authenticationBasic } from "../core/auth";
import { baseErrorResponse } from "../core/base.reponse";
import { HttpStatusMap } from "../core/http.error.code";
import { UserService } from "./user/user.service";
import images from "./images/routes";
import contactForm from "./contactForm/routes";

const module = new Hono<{Variables : UserVariables }>().basePath('/api');

module.use(async(c, next) => {
    c.set('userService', UserService.instance(c.env as any))
    await next() 
});

module.use(authenticationBasic);

module.route('/', user);
module.route('/', projects);
module.route('/', experience);
module.route('/', education);
module.route('/', skills);
module.route('/', expertise);
module.route('/', certifications);
module.route('/', achievements);
module.route('/', services);
module.route('/', articles);
module.route('/', contacts);
module.route('/', openSources);
module.route('/', profile);
module.route('/', images);
module.route('/', contactForm)

module.onError((err: any, c) => {
    console.log(err);
    const status = err?.status;
    c.status(status ?? 400);
    return c.json(
        baseErrorResponse({ errors: ["Invalid Authorized"], message: HttpStatusMap[status ?? 400 ] })
    )
})

export default module;