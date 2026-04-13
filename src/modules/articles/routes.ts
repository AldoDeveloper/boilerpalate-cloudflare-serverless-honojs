import { Hono } from "hono";
import { create, findAll, findOne, findOneBySlug, remove, update } from "./article.controller";
import { articleCreateValidator, articleUpdateValidator } from "./article.validator";
import { ArticleService } from "./article.service";
import { baseErrorResponse } from "../../core/base.reponse";

type ArticleVariables = {
    articleService: ArticleService
}

const article = new Hono<{ Variables: ArticleVariables }>().basePath('/articles');

article.use(async (c, next) => {
    c.set('articleService', ArticleService.instance(c.env as any))
    await next()
})

article.post('/', articleCreateValidator, (c) => create(c, c.get('articleService')));
article.patch('/:id', articleUpdateValidator, (c) => update(c, c.get('articleService')));

article.get('/', (c) => findAll(c, c.get('articleService')));
article.get('/:id', (c) => findOne(c, c.get('articleService')));
article.get('/slug/:slug', (c) => findOneBySlug(c, c.get('articleService')));
article.delete('/:id', (c) => remove(c, c.get('articleService')));

article.onError((err: any, c) => {
    const status = err?.status;
    c.status(status ?? 400);
    return c.json(
        baseErrorResponse({ errors: err.message })
    )
})

export default article;
