import { Context } from "hono";
import { ServiceService } from "./service.service";
import { baseResponse } from "../../core/base.reponse";
import { HttpStatusMap } from "../../core/http.error.code";
import { ServiceDto } from "./dto/service.dto";

export const findAll = async (ctx: Context, serviceService: ServiceService) => {

    const results = await serviceService.findAll();
    return ctx.json(
        baseResponse({ data: results })
    );
};

export const create = async (ctx: Context, serviceService: ServiceService) => {

    const body = await ctx.req.json();
    const result = await serviceService.create(body);

    ctx.status(201);
    return ctx.json(
        baseResponse({ data: result, message: HttpStatusMap[201] })
    );
}

export const findOne = async (ctx: Context, serviceService: ServiceService) => {

    const { id } = ctx.req.param();
    const result = await serviceService.findOne(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const remove = async (ctx: Context, serviceService: ServiceService) => {
    const { id } = ctx.req.param();
    const result = await serviceService.remove(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const update = async (ctx: Context, serviceService: ServiceService) => {
    const { id } = ctx.req.param();
    const body = await ctx.req.json<ServiceDto>();
    const result = await serviceService.update(id, body);

    return ctx.json(
        baseResponse({ data: result })
    )
}
