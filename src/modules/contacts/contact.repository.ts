import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { ContactDto } from "./dto/contact.dto";

export class RepositoryContact {

    private ctx: EnvContext | null = null;

    constructor(envCtx: EnvContext) {
        this.ctx = envCtx;
    }

    async findAll() {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });
        const getPrepare = await this.ctx.api_cv_db.prepare(
            `SELECT
                c.id AS id,
                c.type AS type,
                c.url AS url,
                c.label AS label,
                c.created_at AS created_at,
                c.updated_at AS updated_at
            FROM contacts c`).all();

        return getPrepare.results;
    }

    async findOne(id: string) {

        if (!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });

        const getContact = await this.ctx.api_cv_db.prepare(`
            SELECT
                c.id AS id,
                c.type AS type,
                c.url AS url,
                c.label AS label,
                c.created_at AS created_at,
                c.updated_at AS updated_at
            FROM contacts c
            WHERE c.id = ?
        `).bind(id).first()

        return getContact;
    }

    async create(contactDto: ContactDto) {

        contactDto.id = crypto.randomUUID();

        const keys = Object.keys(contactDto);
        const values = Object.values(contactDto);

        const placeholder = keys.map(() => '?').join(',');

        const queryInsert = `INSERT INTO contacts (${keys.join(',')}, created_at) VALUES (${placeholder}, CURRENT_TIMESTAMP)`

        const result = await this.ctx!.api_cv_db.prepare(queryInsert).bind(...values).run();
        return result
    }

    async remove(ids: Array<string>) {

        const placeholder = ids.map(() => '?').join(',')
        const result = await this.ctx!.api_cv_db.prepare(
            `DELETE FROM contacts WHERE id IN (${placeholder})`
        ).bind(...ids)
            .run();
        return result;
    }

    async update(id: string, contactDto: ContactDto) {
        const keys = Object.keys(contactDto);
        const values = Object.values(contactDto);

        const placeholder = keys.map((key) => `${key} = ?`).join(',');
        const updateQuery = `UPDATE contacts SET ${placeholder}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        const result = await this.ctx!.api_cv_db.prepare(updateQuery).bind(...[...values, id]).run();

        return result;
    }
}
