import { Context } from "hono";
import { ExperienceService } from "./experience.service";
import { baseResponse } from "../../core/base.reponse";
import { HttpStatusMap } from "../../core/http.error.code";
import { ExperienceDto } from "./dto/experience.dto";

export const findAll = async (ctx: Context, experienceService: ExperienceService) => {

    const results = await experienceService.findAll();
    return ctx.json(
        baseResponse({ data: results })
    );
};

export const create = async (ctx: Context, experienceService: ExperienceService) => {

    const body = await ctx.req.json();
    const result = await experienceService.create(body);

    ctx.status(201);
    return ctx.json(
        baseResponse({ data: result, message: HttpStatusMap[201] })
    );
}

export const createMany = async (ctx: Context, experienceService: ExperienceService) => {

    const body = await ctx.req.json();
    const result = await experienceService.createMany(body);

    ctx.status(201);
    return ctx.json(
        baseResponse({ data: result, message: HttpStatusMap[201] })
    );
}

export const findOne = async (ctx: Context, experienceService: ExperienceService) => {

    const { id } = ctx.req.param();
    const result = await experienceService.findOne(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const remove = async (ctx: Context, experienceService: ExperienceService) => {
    const { id } = ctx.req.param();
    const result = await experienceService.remove(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const update = async (ctx: Context, experienceService: ExperienceService) => {
    const { id } = ctx.req.param();
    const body = await ctx.req.json<ExperienceDto>();
    const result = await experienceService.update(id, body);

    return ctx.json(
        baseResponse({ data: result })
    )
}
