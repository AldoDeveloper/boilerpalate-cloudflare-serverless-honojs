import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { AchievementDto } from "./dto/achievement.dto";

export class RepositoryAchievement {

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
                a.description AS description,
                a.issuer AS issuer,
                a.date AS date,
                a.certificate_url AS certificateUrl,
                a.image_url AS imageUrl,
                a.category AS category,
                a.status AS status,
                a.created_at AS created_at,
                a.updated_at AS updated_at
            FROM achievements a`).all();

        return getPrepare.results;
    }

    async findOne(id: string) {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });

        const getAchievement = await this.ctx.api_cv_db.prepare(`
            SELECT
                a.id AS id,
                a.title AS title,
                a.description AS description,
                a.issuer AS issuer,
                a.date AS date,
                a.certificate_url AS certificateUrl,
                a.image_url AS imageUrl,
                a.category AS category,
                a.status AS status,
                a.created_at AS created_at,
                a.updated_at AS updated_at
            FROM achievements a
            WHERE a.id = ?
        `).bind(id).first()

        return getAchievement;
    }

    async create(achievementDto: AchievementDto) {

        achievementDto.id = crypto.randomUUID();

        const keys = Object.keys(achievementDto);
        const values = Object.values(achievementDto);

        const placeholder = keys.map(() => '?').join(',');

        const queryInsert = `INSERT INTO achievements (${keys.join(',')}, created_at) VALUES (${placeholder}, CURRENT_TIMESTAMP)`

        const result = await this.ctx!.api_cv_db.prepare(queryInsert).bind(...values).run();
        return result
    }

    async remove(ids: Array<string>) {

        const placeholder = ids.map(() => '?').join(',')
        const result = await this.ctx!.api_cv_db.prepare(
            `DELETE FROM achievements WHERE id IN (${placeholder})`
        ).bind(...ids)
            .run();
        return result;
    }

    async update(id: string, achievementDto: AchievementDto) {
        const keys = Object.keys(achievementDto);
        const values = Object.values(achievementDto);

        const placeholder = keys.map((key) => `${key} = ?`).join(',');
        const updateQuery = `UPDATE achievements SET ${placeholder}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        const result = await this.ctx!.api_cv_db.prepare(updateQuery).bind(...[...values, id]).run();

        return result;
    }
}
