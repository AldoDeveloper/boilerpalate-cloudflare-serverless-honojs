import { Context } from "hono";
import { ArticleService } from "./article.service";
import { baseResponse } from "../../core/base.reponse";
import { HttpStatusMap } from "../../core/http.error.code";
import { ArticleDto } from "./dto/article.dto";

export const findAll = async (ctx: Context, articleService: ArticleService) => {

    const results = await articleService.findAll();
    return ctx.json(
        baseResponse({ data: results })
    );
};

export const create = async (ctx: Context, articleService: ArticleService) => {

    const body = await ctx.req.json();
    const result = await articleService.create(body);

    ctx.status(201);
    return ctx.json(
        baseResponse({ data: result, message: HttpStatusMap[201] })
    );
}

export const findOne = async (ctx: Context, articleService: ArticleService) => {

    const { id } = ctx.req.param();
    const result = await articleService.findOne(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const findOneBySlug = async (ctx: Context, articleService: ArticleService) => {

    const { slug } = ctx.req.param();
    const result = await articleService.findOneBySlug(slug);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const remove = async (ctx: Context, articleService: ArticleService) => {
    const { id } = ctx.req.param();
    const result = await articleService.remove(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const update = async (ctx: Context, articleService: ArticleService) => {
    const { id } = ctx.req.param();
    const body = await ctx.req.json<ArticleDto>();
    const result = await articleService.update(id, body);

    return ctx.json(
        baseResponse({ data: result })
    )
}
