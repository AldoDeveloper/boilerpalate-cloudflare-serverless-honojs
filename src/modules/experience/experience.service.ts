import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { BaseService } from "../../core/base.service";
import { RepositoryExperience } from "./experience.repository";
import { ExperienceDto } from "./dto/experience.dto";

export class ExperienceService extends BaseService {

    private repoExperience: RepositoryExperience | null = null;

    constructor(envCtx: EnvContext) {
        super(envCtx);
        this.repoExperience = new RepositoryExperience(envCtx);
    }

    static instance(envCtx: EnvContext) {
        return super.getInstance.call(this, envCtx) as ExperienceService;
    }

    async findAll() {
        try {
            return await this.repoExperience!.findAll();

        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async create(experienceCreateDto: ExperienceDto) {

        try {
            await this.repoExperience!.create(experienceCreateDto);

            return `create new experience successfuly.`;
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async createMany(experienceCreateDtos: ExperienceDto[]) {
        try {
            await this.repoExperience!.createMany(experienceCreateDtos);

            return `create many experiences successfuly.`;
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async update(id: string, experienceUpdateDto: ExperienceDto) {
        try {
            return await this.repoExperience!.update(id, experienceUpdateDto);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async findOne(id: string) {
        try {
            return await this.repoExperience!.findOne(id);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async remove(id: string) {
        try {
            return await this.repoExperience!.remove([id]);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

}
