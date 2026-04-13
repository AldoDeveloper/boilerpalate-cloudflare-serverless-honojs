import { Context } from "hono";
import { SkillService } from "./skill.service";
import { baseResponse } from "../../core/base.reponse";
import { HttpStatusMap } from "../../core/http.error.code";
import { SkillDto } from "./dto/skill.dto";

export const findAll = async (ctx: Context, skillService: SkillService) => {

    const results = await skillService.findAll();
    return ctx.json(
        baseResponse({ data: results })
    );
};

export const create = async (ctx: Context, skillService: SkillService) => {

    const body = await ctx.req.json();
    const result = await skillService.create(body);

    ctx.status(201);
    return ctx.json(
        baseResponse({ data: result, message: HttpStatusMap[201] })
    );
}

export const findOne = async (ctx: Context, skillService: SkillService) => {

    const { id } = ctx.req.param();
    const result = await skillService.findOne(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const remove = async (ctx: Context, skillService: SkillService) => {
    const { id } = ctx.req.param();
    const result = await skillService.remove(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const update = async (ctx: Context, skillService: SkillService) => {
    const { id } = ctx.req.param();
    const body = await ctx.req.json<SkillDto>();
    const result = await skillService.update(id, body);

    return ctx.json(
        baseResponse({ data: result })
    )
}
