import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { UserDto } from "./dto/user.dto";

export class RepositoryUser{

    private ctx: EnvContext | null = null;

    constructor(envCtx: EnvContext){
        this.ctx = envCtx;    
    }

    async findAll() {

        if(!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });
        const getPrepare = await this.ctx.api_cv_db.prepare(
            `SELECT 
                u.id AS id, 
                u.name AS name,
                u.username AS username,
                u.email AS email,
                u.request_token AS request_token,
                u.password AS password,
                u.is_active AS is_active,
                u.updated_at AS updated_at,
                u.created_at AS created_at
            FROM users u`).all();

        return getPrepare.results;
    }

    async findOne(id: number) {

         if(!this.ctx) throw new HTTPException(400, { message: "configurasi failed..." });

         const getUser = await this.ctx.api_cv_db.prepare(`
            SELECT 
                u.id AS id, 
                u.name AS name,
                u.email AS email,
                u.request_token AS request_token,
                u.is_active AS is_active,
                u.created_at AS created_at
            FROM users u
            WHERE u.id = ?
        `).bind(id).first()

        return getUser;
    }

    async findByUsername(username: string){
         const getUser = await this.ctx!.api_cv_db.prepare(`
            SELECT 
                u.id AS id, 
                u.name AS name,
                u.email AS email,
                u.username AS username,
                u.password AS password,
                u.request_token AS request_token,
                u.is_active AS is_active,
                u.created_at AS created_at
            FROM users u
            WHERE u.username = ?
        `).bind(username).first<UserDto>()

        return getUser;
    }

    async create(userDto: UserDto) {

        const keys   = Object.keys(userDto);
        const values = Object.values(userDto);
        
        const placholder  = keys.map(() => '?').join(',');

        const queryInsert = `INSERT INTO users (${keys.join(',')}, created_at) VALUES (${placholder}, CURRENT_TIMESTAMP)` 
        
        const result = await this.ctx!.api_cv_db.prepare(queryInsert).bind(...values).run();
        return result
    }

    async remove(ids: Array<number>) {
        
        const placholder = ids.map(() => '?').join(',')
        const result = await this.ctx!.api_cv_db.prepare(
            `DELETE FROM users WHERE id IN (${placholder})`
        ).bind(...ids)
        .run();
        return result;
    }

    async update(id: number, userDto: UserDto) {
        const keys   = Object.keys(userDto);
        const values = Object.values(userDto);
        
        const placholder  = keys.map((key) => `${key} = ?`).join(',');
        const updateQuery = `UPDATE users SET ${placholder}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        const result = await this.ctx!.api_cv_db.prepare(updateQuery).bind(...[...values, id]).run();

        return result;
    }
}