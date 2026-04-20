import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { ExperienceDto } from "./dto/experience.dto";

export class RepositoryExperience {

    private ctx: EnvContext | null = null;

    constructor(envCtx: EnvContext) {
        this.ctx = envCtx;
    }

    async findAll() {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });
        const getPrepare = await this.ctx.api_cv_db.prepare(
            `SELECT
                e.id AS id,
                e.company_name AS company_name,
                e.position AS position,
                e.employment_type AS employment_type,
                e.location AS location,
                e.is_remote AS is_remote,
                e.start_date AS start_date,
                e.end_date AS end_date,
                e.is_current AS is_current,
                e.description AS description,
                e.created_at AS created_at,
                e.updated_at AS updated_at
            FROM experiences e
            ORDER BY e.start_date DESC`).all();

        return getPrepare.results;
    }

    async findOne(id: string) {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });

        const getExperience = await this.ctx.api_cv_db.prepare(`
            SELECT
                e.id AS id,
                e.company_name AS company_name,
                e.position AS position,
                e.employment_type AS employment_type,
                e.location AS location,
                e.is_remote AS is_remote,
                e.start_date AS start_date,
                e.end_date AS end_date,
                e.is_current AS is_current,
                e.description AS description,
                e.created_at AS created_at,
                e.updated_at AS updated_at
            FROM experiences e
            WHERE e.id = ?
        `).bind(id).first()

        return getExperience;
    }

    async create(experienceDto: ExperienceDto) {

        experienceDto.id = experienceDto.id ?? crypto.randomUUID();
        const keys   = Object.keys(experienceDto);
        const values = Object.values(experienceDto);

        const placholder = keys.map(() => '?').join(',');

        const queryInsert = `INSERT INTO experiences (${keys.join(',')}, created_at) VALUES (${placholder}, CURRENT_TIMESTAMP)`

        const result = await this.ctx!.api_cv_db.prepare(queryInsert).bind(...values).run();
        return result
    }

    async createMany(experienceDtos: ExperienceDto[]) {

        if (experienceDtos.length === 0) return { success: true };

        const keys = Object.keys(experienceDtos[0]);
        const valueSets = experienceDtos.map(dto => {
            const values = Object.values(dto);
            const placeholders = values.map(() => '?').join(',');
            return `(${placeholders}, CURRENT_TIMESTAMP)`;
        });

        const allValues = experienceDtos.flatMap(dto => Object.values(dto));
        const columns = keys.join(',');
        const valuesClause = valueSets.join(',');

        const queryInsert = `INSERT INTO experiences (${columns}, created_at) VALUES ${valuesClause}`;

        const result = await this.ctx!.api_cv_db.prepare(queryInsert).bind(...allValues).run();
        return result;
    }

    async remove(ids: Array<string>) {

        const placholder = ids.map(() => '?').join(',')
        const result = await this.ctx!.api_cv_db.prepare(
            `DELETE FROM experiences WHERE id IN (${placholder})`
        ).bind(...ids)
            .run();
        return result;
    }

    async update(id: string, experienceDto: ExperienceDto) {
        const keys = Object.keys(experienceDto);
        const values = Object.values(experienceDto);

        const placholder = keys.map((key) => `${key} = ?`).join(',');
        const updateQuery = `UPDATE experiences SET ${placholder}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        const result = await this.ctx!.api_cv_db.prepare(updateQuery).bind(...[...values, id]).run();

        return result;
    }
}
