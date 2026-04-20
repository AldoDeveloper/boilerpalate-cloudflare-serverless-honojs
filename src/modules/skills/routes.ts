import { Hono } from "hono";
import { create, findAll, findOne, remove, update } from "./skill.controller";
import { skillCreateValidator, skillUpdateValidator } from "./skill.validator";
import { SkillService } from "./skill.service";
import { baseErrorResponse } from "../../core/base.reponse";
import { bodyLimit } from "hono/body-limit";

type SkillVariables = {
    skillService: SkillService
}

const skill = new Hono<{ Variables: SkillVariables }>().basePath('/skills');

skill.use(async (c, next) => {
    c.set('skillService', SkillService.instance(c.env as any))
    await next()
})

skill.post('/', skillCreateValidator, bodyLimit({
    maxSize: 1024 * 1024, // 1MB,
    onError(c) {
        c.status(413);
        return c.json(
            baseErrorResponse({ errors: ["Payload Too Large"], message: "Payload Too Large" })
        )
    },
}), (c) => create(c, c.get('skillService')));
skill.patch('/:id', skillUpdateValidator, (c) => update(c, c.get('skillService')));

skill.get('/', (c) => findAll(c, c.get('skillService')));
skill.get('/:id', (c) => findOne(c, c.get('skillService')));
skill.delete('/:id', (c) => remove(c, c.get('skillService')));

skill.onError((err: any, c) => {
    const status = err?.status;
    c.status(status ?? 400);
    return c.json(
        baseErrorResponse({ errors: err.message })
    )
})

export default skill;
