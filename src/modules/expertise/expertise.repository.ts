import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { ExpertiseDto } from "./dto/expertise.dto";

export class RepositoryExpertise {

    private ctx: EnvContext | null = null;

    constructor(envCtx: EnvContext) {
        this.ctx = envCtx;
    }

    async findAll() {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });
        const getPrepare = await this.ctx.api_cv_db.prepare(
            `SELECT
                e.id AS id,
                e.title AS title,
                e.description AS description,
                e.created_at AS created_at,
                e.updated_at AS updated_at
            FROM expertise e`).all();

        return getPrepare.results;
    }

    async findOne(id: string) {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });

        const getExpertise = await this.ctx.api_cv_db.prepare(`
            SELECT
                e.id AS id,
                e.title AS title,
                e.description AS description,
                e.created_at AS created_at,
                e.updated_at AS updated_at
            FROM expertise e
            WHERE e.id = ?
        `).bind(id).first()

        return getExpertise;
    }

    async create(expertiseDto: ExpertiseDto) {

        expertiseDto.id = crypto.randomUUID();

        const keys = Object.keys(expertiseDto);
        const values = Object.values(expertiseDto);

        const placeholder = keys.map(() => '?').join(',');

        const queryInsert = `INSERT INTO expertise (${keys.join(',')}, created_at) VALUES (${placeholder}, CURRENT_TIMESTAMP)`

        const result = await this.ctx!.api_cv_db.prepare(queryInsert).bind(...values).run();
        return result
    }

    async remove(ids: Array<string>) {

        const placeholder = ids.map(() => '?').join(',')
        const result = await this.ctx!.api_cv_db.prepare(
            `DELETE FROM expertise WHERE id IN (${placeholder})`
        ).bind(...ids)
            .run();
        return result;
    }

    async update(id: string, expertiseDto: ExpertiseDto) {
        const keys = Object.keys(expertiseDto);
        const values = Object.values(expertiseDto);

        const placeholder = keys.map((key) => `${key} = ?`).join(',');
        const updateQuery = `UPDATE expertise SET ${placeholder}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        const result = await this.ctx!.api_cv_db.prepare(updateQuery).bind(...[...values, id]).run();

        return result;
    }
}
