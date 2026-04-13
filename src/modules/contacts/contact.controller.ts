import { Context } from "hono";
import { ContactService } from "./contact.service";
import { baseResponse } from "../../core/base.reponse";
import { HttpStatusMap } from "../../core/http.error.code";
import { ContactDto } from "./dto/contact.dto";

export const findAll = async (ctx: Context, contactService: ContactService) => {

    const results = await contactService.findAll();
    return ctx.json(
        baseResponse({ data: results })
    );
};

export const create = async (ctx: Context, contactService: ContactService) => {

    const body = await ctx.req.json();
    const result = await contactService.create(body);

    ctx.status(201);
    return ctx.json(
        baseResponse({ data: result, message: HttpStatusMap[201] })
    );
}

export const findOne = async (ctx: Context, contactService: ContactService) => {

    const { id } = ctx.req.param();
    const result = await contactService.findOne(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const remove = async (ctx: Context, contactService: ContactService) => {
    const { id } = ctx.req.param();
    const result = await contactService.remove(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const update = async (ctx: Context, contactService: ContactService) => {
    const { id } = ctx.req.param();
    const body = await ctx.req.json<ContactDto>();
    const result = await contactService.update(id, body);

    return ctx.json(
        baseResponse({ data: result })
    )
}
