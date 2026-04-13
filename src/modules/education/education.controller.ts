import { Context } from "hono";
import { EducationService } from "./education.service";
import { baseResponse } from "../../core/base.reponse";
import { HttpStatusMap } from "../../core/http.error.code";
import { EducationDto } from "./dto/education.dto";

export const findAll = async (ctx: Context, educationService: EducationService) => {

    const results = await educationService.findAll();
    return ctx.json(
        baseResponse({ data: results })
    );
};

export const create = async (ctx: Context, educationService: EducationService) => {

    const body = await ctx.req.json();
    const result = await educationService.create(body);

    ctx.status(201);
    return ctx.json(
        baseResponse({ data: result, message: HttpStatusMap[201] })
    );
}

export const createMany = async (ctx: Context, educationService: EducationService) => {

    const body = await ctx.req.json();
    const result = await educationService.createMany(body);

    ctx.status(201);
    return ctx.json(
        baseResponse({ data: result, message: HttpStatusMap[201] })
    );
}

export const findOne = async (ctx: Context, educationService: EducationService) => {

    const { id } = ctx.req.param();
    const result = await educationService.findOne(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const remove = async (ctx: Context, educationService: EducationService) => {
    const { id } = ctx.req.param();
    const result = await educationService.remove(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const update = async (ctx: Context, educationService: EducationService) => {
    const { id } = ctx.req.param();
    const body = await ctx.req.json<EducationDto>();
    const result = await educationService.update(id, body);

    return ctx.json(
        baseResponse({ data: result })
    )
}
