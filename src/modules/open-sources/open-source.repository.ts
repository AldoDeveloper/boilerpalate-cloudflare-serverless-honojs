import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { OpenSourceDto } from "./dto/open-source.dto";

export class RepositoryOpenSource {

    private ctx: EnvContext | null = null;

    constructor(envCtx: EnvContext) {
        this.ctx = envCtx;
    }

    async findAll() {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });
        const getPrepare = await this.ctx.api_cv_db.prepare(
            `SELECT
                o.id AS id,
                o.project_name AS project_name,
                o.repo_url AS repo_url,
                o.description AS description,
                o.stars AS stars,
                o.created_at AS created_at,
                o.updated_at AS updated_at
            FROM open_sources o`).all();

        return getPrepare.results;
    }

    async findOne(id: string) {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });

        const getOpenSource = await this.ctx.api_cv_db.prepare(`
            SELECT
                o.id AS id,
                o.project_name AS project_name,
                o.repo_url AS repo_url,
                o.description AS description,
                o.stars AS stars,
                o.created_at AS created_at,
                o.updated_at AS updated_at
            FROM open_sources o
            WHERE o.id = ?
        `).bind(id).first()

        return getOpenSource;
    }

    async create(openSourceDto: OpenSourceDto) {

        openSourceDto.id = openSourceDto.id ?? crypto.randomUUID();

        const keys = Object.keys(openSourceDto);
        const values = Object.values(openSourceDto);

        const placeholder = keys.map(() => '?').join(',');

        const queryInsert = `INSERT INTO open_sources (${keys.join(',')}, created_at) VALUES (${placeholder}, CURRENT_TIMESTAMP)`

        const result = await this.ctx!.api_cv_db.prepare(queryInsert).bind(...values).run();
        return result
    }

    async remove(ids: Array<string>) {

        const placeholder = ids.map(() => '?').join(',')
        const result = await this.ctx!.api_cv_db.prepare(
            `DELETE FROM open_sources WHERE id IN (${placeholder})`
        ).bind(...ids)
            .run();
        return result;
    }

    async update(id: string, openSourceDto: OpenSourceDto) {
        const keys = Object.keys(openSourceDto);
        const values = Object.values(openSourceDto);

        const placeholder = keys.map((key) => `${key} = ?`).join(',');
        const updateQuery = `UPDATE open_sources SET ${placeholder}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        const result = await this.ctx!.api_cv_db.prepare(updateQuery).bind(...[...values, id]).run();

        return result;
    }
}
