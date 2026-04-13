import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { ProjectDto } from "./dto/project.dto";
// import { crypto } from "@cloudflare/workers-types";

export class RepositoryProject {

    private ctx: EnvContext | null = null;

    constructor(envCtx: EnvContext) {
        this.ctx = envCtx;
    }

    async findAll() {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });
        const getPrepare = await this.ctx.api_cv_db.prepare(
            `SELECT
                p.id AS id,
                p.title AS title,
                p.slug AS slug,
                p.description AS description,
                p.content_md AS content_md,
                p.thumbnail_url AS thumbnail_url,
                p.demo_url AS demo_url,
                p.repo_url AS repo_url,
                p.video_url AS video_url,
                p.created_at AS created_at,
                p.updated_at AS updated_at
            FROM projects p`).all();

        return getPrepare.results;
    }

    async findOne(id: string) {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });

        const getProject = await this.ctx.api_cv_db.prepare(`
            SELECT
                p.id AS id,
                p.title AS title,
                p.slug AS slug,
                p.description AS description,
                p.content_md AS content_md,
                p.thumbnail_url AS thumbnail_url,
                p.demo_url AS demo_url,
                p.repo_url AS repo_url,
                p.video_url AS video_url,
                p.created_at AS created_at,
                p.updated_at AS updated_at
            FROM projects p
            WHERE p.id = ?
        `).bind(id).first()

        return getProject;
    }

    async findOneBySlug(slug: string) {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });

        const getProject = await this.ctx.api_cv_db.prepare(`
            SELECT
                p.id AS id,
                p.title AS title,
                p.slug AS slug,
                p.description AS description,
                p.content_md AS content_md,
                p.thumbnail_url AS thumbnail_url,
                p.demo_url AS demo_url,
                p.repo_url AS repo_url,
                p.video_url AS video_url,
                p.created_at AS created_at,
                p.updated_at AS updated_at
            FROM projects p
            WHERE p.slug = ?
        `).bind(slug).first()

        return getProject;
    }

    async create(projectDto: ProjectDto) {

        projectDto.id = crypto.randomUUID();

        const keys = Object.keys(projectDto);
        const values = Object.values(projectDto);

        const placholder = keys.map(() => '?').join(',');

        const queryInsert = `INSERT INTO projects (${keys.join(',')}, created_at) VALUES (${placholder}, CURRENT_TIMESTAMP)`

        const result = await this.ctx!.api_cv_db.prepare(queryInsert).bind(...values).run();
        return result
    }

    async remove(ids: Array<string>) {

        const placholder = ids.map(() => '?').join(',')
        const result = await this.ctx!.api_cv_db.prepare(
            `DELETE FROM projects WHERE id IN (${placholder})`
        ).bind(...ids)
            .run();
        return result;
    }

    async update(id: string, projectDto: ProjectDto) {
        const keys = Object.keys(projectDto);
        const values = Object.values(projectDto);

        const placholder = keys.map((key) => `${key} = ?`).join(',');
        const updateQuery = `UPDATE projects SET ${placholder}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        const result = await this.ctx!.api_cv_db.prepare(updateQuery).bind(...[...values, id]).run();

        return result;
    }
}
