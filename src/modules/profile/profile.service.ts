import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { BaseService } from "../../core/base.service";
import { RepositoryProfile } from "./profile.repository";
import { ProfileDto } from "./dto/profile.dto";

export class ProfileService extends BaseService {

    private repoProfile: RepositoryProfile | null = null;

    constructor(envCtx: EnvContext) {
        super(envCtx);
        this.repoProfile = new RepositoryProfile(envCtx);
    }

    static instance(envCtx: EnvContext) {
        return super.getInstance.call(this, envCtx) as ProfileService;
    }

    async findAll() {
        try {
            return await this.repoProfile!.findAll();

        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async create(profileCreateDto: ProfileDto) {

        try {
            await this.repoProfile!.create(profileCreateDto);

            return `create new profile successfuly.`;
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async update(id: string, profileUpdateDto: ProfileDto) {
        try {
            return await this.repoProfile!.update(id, profileUpdateDto);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async findOne(id: string) {
        try {
            return await this.repoProfile!.findOne(id);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async findOneByUsername(username: string) {
        try {
            return await this.repoProfile!.findOneByUsername(username);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async remove(id: string) {
        try {
            return await this.repoProfile!.remove([id]);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

}
