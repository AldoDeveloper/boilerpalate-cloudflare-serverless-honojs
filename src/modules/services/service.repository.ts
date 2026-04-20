import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { ServiceDto } from "./dto/service.dto";

export class RepositoryService {

    private ctx: EnvContext | null = null;

    constructor(envCtx: EnvContext) {
        this.ctx = envCtx;
    }

    async findAll() {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });
        const getPrepare = await this.ctx.api_cv_db.prepare(
            `SELECT
                s.id AS id,
                s.title AS title,
                s.icon AS icon,
                s.description AS description,
                s.price AS price,
                s.created_at AS created_at,
                s.updated_at AS updated_at
            FROM services s`).all();

        return getPrepare.results;
    }

    async findOne(id: string) {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });

        const getService = await this.ctx.api_cv_db.prepare(`
            SELECT
                s.id AS id,
                s.title AS title,
                s.icon AS icon,
                s.description AS description,
                s.price AS price,
                s.created_at AS created_at,
                s.updated_at AS updated_at
            FROM services s
            WHERE s.id = ?
        `).bind(id).first()

        return getService;
    }

    async create(serviceDto: ServiceDto) {

        serviceDto.id = crypto.randomUUID();

        const keys = Object.keys(serviceDto);
        const values = Object.values(serviceDto);

        const placeholder = keys.map(() => '?').join(',');

        const queryInsert = `INSERT INTO services (${keys.join(',')}, created_at) VALUES (${placeholder}, CURRENT_TIMESTAMP)`

        const result = await this.ctx!.api_cv_db.prepare(queryInsert).bind(...values).run();
        return result
    }

    async remove(ids: Array<string>) {

        const placeholder = ids.map(() => '?').join(',')
        const result = await this.ctx!.api_cv_db.prepare(
            `DELETE FROM services WHERE id IN (${placeholder})`
        ).bind(...ids)
            .run();
        return result;
    }

    async update(id: string, serviceDto: ServiceDto) {
        const keys = Object.keys(serviceDto);
        const values = Object.values(serviceDto);

        const placeholder = keys.map((key) => `${key} = ?`).join(',');
        const updateQuery = `UPDATE services SET ${placeholder}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        const result = await this.ctx!.api_cv_db.prepare(updateQuery).bind(...[...values, id]).run();

        return result;
    }
}
