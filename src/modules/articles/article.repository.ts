import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { ArticleDto } from "./dto/article.dto";

export class RepositoryArticle {

    private ctx: EnvContext | null = null;

    constructor(envCtx: EnvContext) {
        this.ctx = envCtx;
    }

    async findAll() {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });
        const getPrepare = await this.ctx.api_cv_db.prepare(
            `SELECT
                a.id AS id,
                a.title AS title,
                a.slug AS slug,
                a.content_md AS content_md,
                a.thumbnail_url AS thumbnail_url,
                a.published AS published,
                a.created_at AS created_at,
                a.updated_at AS updated_at
            FROM articles a`).all();

        return getPrepare.results;
    }

    async findOne(id: string) {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });

        const getArticle = await this.ctx.api_cv_db.prepare(`
            SELECT
                a.id AS id,
                a.title AS title,
                a.slug AS slug,
                a.content_md AS content_md,
                a.thumbnail_url AS thumbnail_url,
                a.published AS published,
                a.created_at AS created_at,
                a.updated_at AS updated_at
            FROM articles a
            WHERE a.id = ?
        `).bind(id).first()

        return getArticle;
    }

    async findOneBySlug(slug: string) {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });

        const getArticle = await this.ctx.api_cv_db.prepare(`
            SELECT
                a.id AS id,
                a.title AS title,
                a.slug AS slug,
                a.content_md AS content_md,
                a.thumbnail_url AS thumbnail_url,
                a.published AS published,
                a.created_at AS created_at,
                a.updated_at AS updated_at
            FROM articles a
            WHERE a.slug = ?
        `).bind(slug).first()

        return getArticle;
    }

    async create(articleDto: ArticleDto) {

        articleDto.id = crypto.randomUUID();

        const keys = Object.keys(articleDto);
        const values = Object.values(articleDto);

        const placeholder = keys.map(() => '?').join(',');

        const queryInsert = `INSERT INTO articles (${keys.join(',')}, created_at) VALUES (${placeholder}, CURRENT_TIMESTAMP)`

        const result = await this.ctx!.api_cv_db.prepare(queryInsert).bind(...values).run();
        return result
    }

    async remove(ids: Array<string>) {

        const placeholder = ids.map(() => '?').join(',')
        const result = await this.ctx!.api_cv_db.prepare(
            `DELETE FROM articles WHERE id IN (${placeholder})`
        ).bind(...ids)
            .run();
        return result;
    }

    async update(id: string, articleDto: ArticleDto) {
        const keys = Object.keys(articleDto);
        const values = Object.values(articleDto);

        const placeholder = keys.map((key) => `${key} = ?`).join(',');
        const updateQuery = `UPDATE articles SET ${placeholder}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        const result = await this.ctx!.api_cv_db.prepare(updateQuery).bind(...[...values, id]).run();

        return result;
    }
}
