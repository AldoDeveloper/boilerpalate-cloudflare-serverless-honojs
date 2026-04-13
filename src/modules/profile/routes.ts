import { Hono } from "hono";
import { create, findAll, findOne, findOneByUsername, remove, update } from "./profile.controller";
import { profileCreateValidator, profileUpdateValidator } from "./profile.validator";
import { ProfileService } from "./profile.service";
import { baseErrorResponse } from "../../core/base.reponse";

type ProfileVariables = {
    profileService: ProfileService
}

const profile = new Hono<{ Variables: ProfileVariables }>().basePath('/profile');

profile.use(async (c, next) => {
    c.set('profileService', ProfileService.instance(c.env as any))
    await next()
})

profile.post('/', profileCreateValidator, (c) => create(c, c.get('profileService')));
profile.patch('/:id', profileUpdateValidator, (c) => update(c, c.get('profileService')));

profile.get('/', (c) => findAll(c, c.get('profileService')));
profile.get('/:id', (c) => findOne(c, c.get('profileService')));
profile.get('/username/:username', (c) => findOneByUsername(c, c.get('profileService')));
profile.delete('/:id', (c) => remove(c, c.get('profileService')));

profile.onError((err: any, c) => {
    const status = err?.status;
    c.status(status ?? 400);
    return c.json(
        baseErrorResponse({ errors: err.message })
    )
})

export default profile;
