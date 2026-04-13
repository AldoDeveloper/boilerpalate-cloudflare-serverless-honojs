import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { CertificationDto } from "./dto/certification.dto";

export class RepositoryCertification {

    private ctx: EnvContext | null = null;

    constructor(envCtx: EnvContext) {
        this.ctx = envCtx;
    }

    async findAll() {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });
        const getPrepare = await this.ctx.api_cv_db.prepare(
            `SELECT
                c.id AS id,
                c.name AS name,
                c.issuer AS issuer,
                c.issue_date AS issue_date,
                c.credential_url AS credential_url,
                c.description AS description,
                c.created_at AS created_at,
                c.updated_at AS updated_at
            FROM certifications c`).all();

        return getPrepare.results;
    }

    async findOne(id: string) {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });

        const getCertification = await this.ctx.api_cv_db.prepare(`
            SELECT
                c.id AS id,
                c.name AS name,
                c.issuer AS issuer,
                c.issue_date AS issue_date,
                c.credential_url AS credential_url,
                c.description AS description,
                c.created_at AS created_at,
                c.updated_at AS updated_at
            FROM certifications c
            WHERE c.id = ?
        `).bind(id).first()

        return getCertification;
    }

    async create(certificationDto: CertificationDto) {

        certificationDto.id = crypto.randomUUID();

        const keys = Object.keys(certificationDto);
        const values = Object.values(certificationDto);

        const placeholder = keys.map(() => '?').join(',');

        const queryInsert = `INSERT INTO certifications (${keys.join(',')}, created_at) VALUES (${placeholder}, CURRENT_TIMESTAMP)`

        const result = await this.ctx!.api_cv_db.prepare(queryInsert).bind(...values).run();
        return result
    }

    async remove(ids: Array<string>) {

        const placeholder = ids.map(() => '?').join(',')
        const result = await this.ctx!.api_cv_db.prepare(
            `DELETE FROM certifications WHERE id IN (${placeholder})`
        ).bind(...ids)
            .run();
        return result;
    }

    async update(id: string, certificationDto: CertificationDto) {
        const keys = Object.keys(certificationDto);
        const values = Object.values(certificationDto);

        const placeholder = keys.map((key) => `${key} = ?`).join(',');
        const updateQuery = `UPDATE certifications SET ${placeholder}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        const result = await this.ctx!.api_cv_db.prepare(updateQuery).bind(...[...values, id]).run();

        return result;
    }
}
