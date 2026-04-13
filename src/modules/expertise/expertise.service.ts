import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { BaseService } from "../../core/base.service";
import { RepositoryExpertise } from "./expertise.repository";
import { ExpertiseDto } from "./dto/expertise.dto";

export class ExpertiseService extends BaseService {

    private repoExpertise: RepositoryExpertise | null = null;

    constructor(envCtx: EnvContext) {
        super(envCtx);
        this.repoExpertise = new RepositoryExpertise(envCtx);
    }

    static instance(envCtx: EnvContext) {
        return super.getInstance.call(this, envCtx) as ExpertiseService;
    }

    async findAll() {
        try {
            return await this.repoExpertise!.findAll();

        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async create(expertiseCreateDto: ExpertiseDto) {

        try {
            await this.repoExpertise!.create(expertiseCreateDto);

            return `create new expertise successfuly.`;
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async update(id: string, expertiseUpdateDto: ExpertiseDto) {
        try {
            return await this.repoExpertise!.update(id, expertiseUpdateDto);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async findOne(id: string) {
        try {
            return await this.repoExpertise!.findOne(id);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async remove(id: string) {
        try {
            return await this.repoExpertise!.remove([id]);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

}
