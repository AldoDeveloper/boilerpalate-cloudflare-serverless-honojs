import { EnvContext } from "../../core/context";
import { ContactFormDto } from "./dto/contact.form.dto";


export class ContactFormRepository {

    private ctx!: EnvContext

    constructor(envCtx: EnvContext) {
        this.ctx = envCtx;
    }

    async findAll<T>(): Promise<T[]> {
        const getPrepare = await this.ctx.api_cv_db.prepare(
            `SELECT
                id,
                name,
                email,
                message,
                created_at
            FROM contact_form`).all();

        return getPrepare.results as T[];
    }

    async findOne<T>(id: string): Promise<T> {
        const getContactForm = await this.ctx.api_cv_db.prepare(`
            SELECT
                id,
                name,
                email,
                message,
                created_at
            FROM contact_form
            WHERE id = ?
        `).bind(id).first();

        return getContactForm as T;
    }

    async create(contactFormDto: ContactFormDto) {
        contactFormDto.id = crypto.randomUUID();
        const keys   = Object.keys(contactFormDto);
        const values = Object.values(contactFormDto);
        const placeholder = keys.map(() => '?').join(',');
        const queryInsert = `INSERT INTO contact_form (${keys.join(',')}, created_at) VALUES (${placeholder}, CURRENT_TIMESTAMP)`;
        
        const result = await this.ctx.api_cv_db.prepare(queryInsert).bind(...values).run();
        
        return result;

    }

    async update(id: string, contactFormDto: ContactFormDto) {
        const keys   = Object.keys(contactFormDto);
        const values = Object.values(contactFormDto);
        const setString = keys.map(key => `${key} = ?`).join(', ');

        const queryUpdate = `UPDATE contact_form SET ${setString} WHERE id = ?`;    
        const result = await this.ctx.api_cv_db.prepare(queryUpdate).bind(...[...values, id]).run();
        
        return result;
    }

    async remove(ids: Array<string>) {
        const placeholder = ids.map(() => '?').join(',');
        const queryDelete = `DELETE FROM contact_form WHERE id IN (${placeholder})`;
        const result = await this.ctx.api_cv_db.prepare(queryDelete).bind(...ids).run();
        return result;
    }

}