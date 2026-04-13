import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { ProfileDto } from "./dto/profile.dto";

export class RepositoryProfile {

    private ctx: EnvContext | null = null;

    constructor(envCtx: EnvContext) {
        this.ctx = envCtx;
    }

    async findAll() {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });
        const getPrepare = await this.ctx.api_cv_db.prepare(
            `SELECT
                p.id AS id,
                p.full_name AS full_name,
                p.username AS username,
                p.email AS email,
                p.headline AS headline,
                p.bio AS bio,
                p.avatar_url AS avatar_url,
                p.resume_url AS resume_url,
                p.location AS location,
                p.is_available AS is_available,
                p.years_of_experience AS years_of_experience,
                p.created_at AS created_at,
                p.updated_at AS updated_at
            FROM profiles p`).all();

        return getPrepare.results;
    }

    async findOne(id: string) {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });

        const getProfile = await this.ctx.api_cv_db.prepare(`
            SELECT
                p.id AS id,
                p.full_name AS full_name,
                p.username AS username,
                p.email AS email,
                p.headline AS headline,
                p.bio AS bio,
                p.avatar_url AS avatar_url,
                p.resume_url AS resume_url,
                p.location AS location,
                p.is_available AS is_available,
                p.years_of_experience AS years_of_experience,
                p.created_at AS created_at,
                p.updated_at AS updated_at
            FROM profiles p
            WHERE p.id = ?
        `).bind(id).first()

        return getProfile;
    }

    async findOneByUsername(username: string) {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });

        const getProfile = await this.ctx.api_cv_db.prepare(`
            SELECT
                p.id AS id,
                p.full_name AS full_name,
                p.username AS username,
                p.email AS email,
                p.headline AS headline,
                p.bio AS bio,
                p.avatar_url AS avatar_url,
                p.resume_url AS resume_url,
                p.location AS location,
                p.is_available AS is_available,
                p.years_of_experience AS years_of_experience,
                p.created_at AS created_at,
                p.updated_at AS updated_at
            FROM profiles p
            WHERE p.username = ?
        `).bind(username).first()

        return getProfile;
    }

    async create(profileDto: ProfileDto) {

        profileDto.id = profileDto.id ?? crypto.randomUUID();

        const keys = Object.keys(profileDto);
        const values = Object.values(profileDto);

        const placeholder = keys.map(() => '?').join(',');

        const queryInsert = `INSERT INTO profiles (${keys.join(',')}, created_at) VALUES (${placeholder}, CURRENT_TIMESTAMP)`

        const result = await this.ctx!.api_cv_db.prepare(queryInsert).bind(...values).run();
        return result
    }

    async remove(ids: Array<string>) {

        const placeholder = ids.map(() => '?').join(',')
        const result = await this.ctx!.api_cv_db.prepare(
            `DELETE FROM profiles WHERE id IN (${placeholder})`
        ).bind(...ids)
            .run();
        return result;
    }

    async update(id: string, profileDto: ProfileDto) {
        const keys = Object.keys(profileDto);
        const values = Object.values(profileDto);

        const placeholder = keys.map((key) => `${key} = ?`).join(',');
        const updateQuery = `UPDATE profiles SET ${placeholder}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        const result = await this.ctx!.api_cv_db.prepare(updateQuery).bind(...[...values, id]).run();

        return result;
    }
}
