import { Context } from "hono";
import { ExpertiseService } from "./expertise.service";
import { baseResponse } from "../../core/base.reponse";
import { HttpStatusMap } from "../../core/http.error.code";
import { ExpertiseDto } from "./dto/expertise.dto";

export const findAll = async (ctx: Context, expertiseService: ExpertiseService) => {

    const results = await expertiseService.findAll();
    return ctx.json(
        baseResponse({ data: results })
    );
};

export const create = async (ctx: Context, expertiseService: ExpertiseService) => {

    const body = await ctx.req.json();
    const result = await expertiseService.create(body);

    ctx.status(201);
    return ctx.json(
        baseResponse({ data: result, message: HttpStatusMap[201] })
    );
}

export const findOne = async (ctx: Context, expertiseService: ExpertiseService) => {

    const { id } = ctx.req.param();
    const result = await expertiseService.findOne(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const remove = async (ctx: Context, expertiseService: ExpertiseService) => {
    const { id } = ctx.req.param();
    const result = await expertiseService.remove(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const update = async (ctx: Context, expertiseService: ExpertiseService) => {
    const { id } = ctx.req.param();
    const body = await ctx.req.json<ExpertiseDto>();
    const result = await expertiseService.update(id, body);

    return ctx.json(
        baseResponse({ data: result })
    )
}
