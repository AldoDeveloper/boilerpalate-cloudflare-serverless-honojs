import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { BaseService } from "../../core/base.service";
import { RepositoryUser } from "./user.repository";
import { UserDto } from "./dto/user.dto";
import bcrypt from 'bcryptjs';

export class UserService extends BaseService{

    private repoUser: RepositoryUser | null = null;
    
    constructor(envCtx: EnvContext) {
        super(envCtx);
        this.repoUser = new RepositoryUser(envCtx);
    }

    static instance(envCtx: EnvContext) {
        return super.getInstance.call(this, envCtx) as UserService;
    }

    async findAll() {
        try{
            return await this.repoUser!.findAll();

        }catch(err: any){
            throw new HTTPException(400, { message: `${err.message}`})
        }
    }
    
    async create(userCreateDto: UserDto){

        try{

            const passwordHashing = await bcrypt.hash(userCreateDto.password, 10);

            await this.repoUser!.create({
                ...userCreateDto,
                password: passwordHashing
            });

            return `create new users successfuly.`;
        }catch(err: any){
            throw new HTTPException(400, { message: `${err.message}`})
        }
    }

    async update(id: number, userUpdateDto: UserDto){
        try{
            return await this.repoUser!.update(id, userUpdateDto);
        }catch(err: any){
             throw new HTTPException(400, { message: `${err.message}`})
        }
    }

    async findOne(id: number){
        try{
            return await this.repoUser!.findOne(id);
        }catch(err: any){
             throw new HTTPException(400, { message: `${err.message}`})
        }
    }

    async findByUsername(username: string) {
        try{
            return await this.repoUser!.findByUsername(username);
        }catch(err: any){
            throw new HTTPException(400, { message: `${err.message}`})
        }
    }

    async remove(id: number) {
       try{
        return await this.repoUser!.remove([id]);
       }catch(err: any){
         throw new HTTPException(400, { message: `${err.message}`})
       }
    }

}