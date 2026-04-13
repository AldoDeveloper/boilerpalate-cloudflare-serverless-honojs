import { Context } from "hono";
import { OpenSourceService } from "./open-source.service";
import { baseResponse } from "../../core/base.reponse";
import { HttpStatusMap } from "../../core/http.error.code";
import { OpenSourceDto } from "./dto/open-source.dto";

export const findAll = async (ctx: Context, openSourceService: OpenSourceService) => {

    const results = await openSourceService.findAll();
    return ctx.json(
        baseResponse({ data: results })
    );
};

export const create = async (ctx: Context, openSourceService: OpenSourceService) => {

    const body = await ctx.req.json();
    const result = await openSourceService.create(body);

    ctx.status(201);
    return ctx.json(
        baseResponse({ data: result, message: HttpStatusMap[201] })
    );
}

export const findOne = async (ctx: Context, openSourceService: OpenSourceService) => {

    const { id } = ctx.req.param();
    const result = await openSourceService.findOne(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const remove = async (ctx: Context, openSourceService: OpenSourceService) => {
    const { id } = ctx.req.param();
    const result = await openSourceService.remove(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const update = async (ctx: Context, openSourceService: OpenSourceService) => {
    const { id } = ctx.req.param();
    const body = await ctx.req.json<OpenSourceDto>();
    const result = await openSourceService.update(id, body);

    return ctx.json(
        baseResponse({ data: result })
    )
}
