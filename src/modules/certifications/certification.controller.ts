import { Context } from "hono";
import { CertificationService } from "./certification.service";
import { baseResponse } from "../../core/base.reponse";
import { HttpStatusMap } from "../../core/http.error.code";
import { CertificationDto } from "./dto/certification.dto";

export const findAll = async (ctx: Context, certificationService: CertificationService) => {

    const results = await certificationService.findAll();
    return ctx.json(
        baseResponse({ data: results })
    );
};

export const create = async (ctx: Context, certificationService: CertificationService) => {

    const body = await ctx.req.json();
    const result = await certificationService.create(body);

    ctx.status(201);
    return ctx.json(
        baseResponse({ data: result, message: HttpStatusMap[201] })
    );
}

export const findOne = async (ctx: Context, certificationService: CertificationService) => {

    const { id } = ctx.req.param();
    const result = await certificationService.findOne(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const remove = async (ctx: Context, certificationService: CertificationService) => {
    const { id } = ctx.req.param();
    const result = await certificationService.remove(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const update = async (ctx: Context, certificationService: CertificationService) => {
    const { id } = ctx.req.param();
    const body = await ctx.req.json<CertificationDto>();
    const result = await certificationService.update(id, body);

    return ctx.json(
        baseResponse({ data: result })
    )
}
