import { Context } from "hono";
import { ProfileService } from "./profile.service";
import { baseResponse } from "../../core/base.reponse";
import { HttpStatusMap } from "../../core/http.error.code";
import { ProfileDto } from "./dto/profile.dto";

export const findAll = async (ctx: Context, profileService: ProfileService) => {

    const results = await profileService.findAll();
    return ctx.json(
        baseResponse({ data: results })
    );
};

export const create = async (ctx: Context, profileService: ProfileService) => {

    const body = await ctx.req.json();
    const result = await profileService.create(body);

    ctx.status(201);
    return ctx.json(
        baseResponse({ data: result, message: HttpStatusMap[201] })
    );
}

export const findOne = async (ctx: Context, profileService: ProfileService) => {

    const { id } = ctx.req.param();
    const result = await profileService.findOne(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const findOneByUsername = async (ctx: Context, profileService: ProfileService) => {

    const { username } = ctx.req.param();
    const result = await profileService.findOneByUsername(username);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const remove = async (ctx: Context, profileService: ProfileService) => {
    const { id } = ctx.req.param();
    const result = await profileService.remove(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const update = async (ctx: Context, profileService: ProfileService) => {
    const { id } = ctx.req.param();
    const body = await ctx.req.json<ProfileDto>();
    const result = await profileService.update(id, body);

    return ctx.json(
        baseResponse({ data: result })
    )
}
