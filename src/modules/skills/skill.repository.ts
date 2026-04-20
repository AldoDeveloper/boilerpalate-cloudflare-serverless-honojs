import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { SkillDto } from "./dto/skill.dto";

export class RepositorySkill {

    private ctx: EnvContext | null = null;

    constructor(envCtx: EnvContext) {
        this.ctx = envCtx;
    }

    async findAll<T>() : Promise<T[]> {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });
        const getPrepare = await this.ctx.api_cv_db.prepare(
            `SELECT
                s.id AS id,
                s.name AS name,
                s.icon_svg AS icon_svg,
                s.category AS category,
                s.level AS level,
                s.level_percent AS level_percent,
                s.description AS description,
                s.created_at AS created_at,
                s.updated_at AS updated_at
            FROM skills s`).all();

        return getPrepare.results as T[];
    }

    async findOne<T>(id: string) {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });

        const getSkill = await this.ctx.api_cv_db.prepare(`
            SELECT
                s.id AS id,
                s.name AS name,
                s.icon_svg AS icon_svg,
                s.category AS category,
                s.level AS level,
                s.level_percent AS level_percent,
                s.description AS description,
                s.created_at AS created_at,
                s.updated_at AS updated_at
            FROM skills s
            WHERE s.id = ?
        `).bind(id).first()

        return getSkill as T;
    }

    async create(skillDto: SkillDto) {

        skillDto.id = crypto.randomUUID();

        const keys = Object.keys(skillDto);
        const values = Object.values(skillDto);

        const placeholder = keys.map(() => '?').join(',');

        const queryInsert = `INSERT INTO skills (${keys.join(',')}, created_at) VALUES (${placeholder}, CURRENT_TIMESTAMP)`

        const result = await this.ctx!.api_cv_db.prepare(queryInsert).bind(...values).run();
        return result
    }

    async remove(ids: Array<string>) {

        const placeholder = ids.map(() => '?').join(',')
        const result = await this.ctx!.api_cv_db.prepare(
            `DELETE FROM skills WHERE id IN (${placeholder})`
        ).bind(...ids)
            .run();
        return result;
    }

    async update(id: string, skillDto: SkillDto) {
        const keys = Object.keys(skillDto);
        const values = Object.values(skillDto);

        const placeholder = keys.map((key) => `${key} = ?`).join(',');
        const updateQuery = `UPDATE skills SET ${placeholder}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        const result = await this.ctx!.api_cv_db.prepare(updateQuery).bind(...[...values, id]).run();

        return result;
    }
}
