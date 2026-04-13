import { Hono } from "hono";
import { create, findAll, findOne, remove, update } from "./user.controller";
import { userCreateValidator, userUpdateValidator } from "./user.validator";
import { UserService } from "./user.service";
import { baseErrorResponse } from "../../core/base.reponse";

export type UserVariables = {
    userService: UserService
}

const user = new Hono<{ Variables: UserVariables }>().basePath('/user');

user.use(async(c, next) => {
    c.set('userService', UserService.instance(c.env as any))
    await next() 
})

user.post('/',     userCreateValidator, (c) => create(c, c.get('userService')));
user.patch('/:id', userUpdateValidator, (c)  => update(c, c.get('userService')));

user.get('/', (c)       => findAll(c, c.get('userService')));
user.get('/:id', (c)    => findOne(c, c.get('userService')));
user.delete('/:id', (c) => remove(c, c.get('userService')));

user.onError((err:  any, c) => {
    const status = err?.status;
    c.status(status ?? 400);
    return c.json(
        baseErrorResponse({ errors: err.message })
    )
})

export default user;