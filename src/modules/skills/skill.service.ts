import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { BaseService } from "../../core/base.service";
import { RepositorySkill } from "./skill.repository";
import { SkillDto } from "./dto/skill.dto";

export class SkillService extends BaseService {

    private repoSkill: RepositorySkill | null = null;

    constructor(envCtx: EnvContext) {
        super(envCtx);
        this.repoSkill = new RepositorySkill(envCtx);
    }

    static instance(envCtx: EnvContext) {
        return super.getInstance.call(this, envCtx) as SkillService;
    }

    async findAll() {
        try {
            return await this.repoSkill!.findAll();

        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async create(skillCreateDto: SkillDto) {

        try {
            await this.repoSkill!.create(skillCreateDto);

            return `create new skill successfuly.`;
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async update(id: string, skillUpdateDto: SkillDto) {
        try {
            return await this.repoSkill!.update(id, skillUpdateDto);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async findOne(id: string) {
        try {
            return await this.repoSkill!.findOne(id);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async remove(id: string) {
        try {
            return await this.repoSkill!.remove([id]);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

}
