import { Context } from "hono";
import { UserService } from "./user.service";
import { baseResponse } from "../../core/base.reponse";
import { HttpStatusMap } from "../../core/http.error.code";
import { UserDto } from "./dto/user.dto";

export const findAll = async(ctx: Context, userService: UserService) => {

   const results = await userService.findAll();
   return ctx.json(
    baseResponse({ data: results })
   );
};

export const create = async(ctx: Context, userService: UserService) => {

    const body = await ctx.req.json();
    const result = await userService.create(body);

    ctx.status(201);
    return ctx.json(
        baseResponse({ data: result, message: HttpStatusMap[201] })
    );
}

export const findOne = async(ctx: Context, userService: UserService) => {

    const { id } = ctx.req.param();
    const result = await userService.findOne(parseInt(id));

    return ctx.json(
        baseResponse({ data: result  })
    )
}

export const remove = async(ctx: Context, userService: UserService) => {
   const { id } = ctx.req.param();
   const result = await userService.remove(parseInt(id));

   return ctx.json(
    baseResponse({ data: result })
   )
}

export const update = async(ctx: Context, userService: UserService) => {
    const { id } = ctx.req.param();
    const body = await ctx.req.json<UserDto>();
    const result = await userService.update(parseInt(id), body);

    return ctx.json(
        baseResponse({ data: result })
    )
}