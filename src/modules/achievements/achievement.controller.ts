import { Context } from "hono";
import { AchievementService } from "./achievement.service";
import { baseResponse } from "../../core/base.reponse";
import { HttpStatusMap } from "../../core/http.error.code";
import { AchievementDto } from "./dto/achievement.dto";

export const findAll = async (ctx: Context, achievementService: AchievementService) => {

    const results = await achievementService.findAll();
    return ctx.json(
        baseResponse({ data: results })
    );
};

export const create = async (ctx: Context, achievementService: AchievementService) => {

    const body = await ctx.req.json();
    const result = await achievementService.create(body);

    ctx.status(201);
    return ctx.json(
        baseResponse({ data: result, message: HttpStatusMap[201] })
    );
}

export const findOne = async (ctx: Context, achievementService: AchievementService) => {

    const { id } = ctx.req.param();
    const result = await achievementService.findOne(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const remove = async (ctx: Context, achievementService: AchievementService) => {
    const { id } = ctx.req.param();
    const result = await achievementService.remove(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const update = async (ctx: Context, achievementService: AchievementService) => {
    const { id } = ctx.req.param();
    const body = await ctx.req.json<AchievementDto>();
    const result = await achievementService.update(id, body);

    return ctx.json(
        baseResponse({ data: result })
    )
}
