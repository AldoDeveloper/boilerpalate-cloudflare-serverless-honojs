import { Hono } from "hono";
import { create, findAll, findOne, remove, update } from "./achievement.controller";
import { achievementCreateValidator, achievementUpdateValidator } from "./achievement.validator";
import { AchievementService } from "./achievement.service";
import { baseErrorResponse } from "../../core/base.reponse";

type AchievementVariables = {
    achievementService: AchievementService
}

const achievement = new Hono<{ Variables: AchievementVariables }>().basePath('/achievements');

achievement.use(async (c, next) => {
    c.set('achievementService', AchievementService.instance(c.env as any))
    await next()
})

achievement.post('/', achievementCreateValidator, (c) => create(c, c.get('achievementService')));
achievement.patch('/:id', achievementUpdateValidator, (c) => update(c, c.get('achievementService')));

achievement.get('/', (c) => findAll(c, c.get('achievementService')));
achievement.get('/:id', (c) => findOne(c, c.get('achievementService')));
achievement.delete('/:id', (c) => remove(c, c.get('achievementService')));

achievement.onError((err: any, c) => {
    const status = err?.status;
    c.status(status ?? 400);
    return c.json(
        baseErrorResponse({ errors: err.message })
    )
})

export default achievement;
