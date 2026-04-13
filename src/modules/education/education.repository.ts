import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { EducationDto } from "./dto/education.dto";

export class RepositoryEducation {

    private ctx: EnvContext | null = null;

    constructor(envCtx: EnvContext) {
        this.ctx = envCtx;
    }

    async findAll() {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });
        const getPrepare = await this.ctx.api_cv_db.prepare(
            `SELECT
                e.id AS id,
                e.institution_name AS institution_name,
                e.education_level AS education_level,
                e.major AS major,
                e.start_date AS start_date,
                e.end_date AS end_date,
                e.is_current AS is_current,
                e.grade AS grade,
                e.description AS description,
                e.created_at AS created_at,
                e.updated_at AS updated_at
            FROM educations e
            ORDER BY e.start_date DESC`).all();

        return getPrepare.results;
    }

    async findOne(id: string) {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });

        const getEducation = await this.ctx.api_cv_db.prepare(`
            SELECT
                e.id AS id,
                e.institution_name AS institution_name,
                e.education_level AS education_level,
                e.major AS major,
                e.start_date AS start_date,
                e.end_date AS end_date,
                e.is_current AS is_current,
                e.grade AS grade,
                e.description AS description,
                e.created_at AS created_at,
                e.updated_at AS updated_at
            FROM educations e
            WHERE e.id = ?
        `).bind(id).first()

        return getEducation;
    }

    async create(educationDto: EducationDto) {

        educationDto.id = educationDto.id ?? crypto.randomUUID();

        const keys = Object.keys(educationDto);
        const values = Object.values(educationDto);

        const placholder = keys.map(() => '?').join(',');

        const queryInsert = `INSERT INTO educations (${keys.join(',')}, created_at) VALUES (${placholder}, CURRENT_TIMESTAMP)`

        const result = await this.ctx!.api_cv_db.prepare(queryInsert).bind(...values).run();
        return result
    }

    async createMany(educationDtos: EducationDto[]) {

        if (educationDtos.length === 0) return { success: true };

        const keys = Object.keys(educationDtos[0]);
        const valueSets = educationDtos.map(dto => {
            const values = Object.values(dto);
            const placeholders = values.map(() => '?').join(',');
            return `(${placeholders}, CURRENT_TIMESTAMP)`;
        });

        const allValues = educationDtos.flatMap(dto => Object.values(dto));
        const columns = keys.join(',');
        const valuesClause = valueSets.join(',');

        const queryInsert = `INSERT INTO educations (${columns}, created_at) VALUES ${valuesClause}`;

        const result = await this.ctx!.api_cv_db.prepare(queryInsert).bind(...allValues).run();
        return result;
    }

    async remove(ids: Array<string>) {

        const placholder = ids.map(() => '?').join(',')
        const result = await this.ctx!.api_cv_db.prepare(
            `DELETE FROM educations WHERE id IN (${placholder})`
        ).bind(...ids)
            .run();
        return result;
    }

    async update(id: string, educationDto: EducationDto) {
        const keys = Object.keys(educationDto);
        const values = Object.values(educationDto);

        const placholder = keys.map((key) => `${key} = ?`).join(',');
        const updateQuery = `UPDATE educations SET ${placholder}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        const result = await this.ctx!.api_cv_db.prepare(updateQuery).bind(...[...values, id]).run();

        return result;
    }
}
