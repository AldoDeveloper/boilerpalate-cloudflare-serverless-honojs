import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { BaseService } from "../../core/base.service";
import { RepositoryOpenSource } from "./open-source.repository";
import { OpenSourceDto } from "./dto/open-source.dto";

export class OpenSourceService extends BaseService {

    private repoOpenSource: RepositoryOpenSource | null = null;

    constructor(envCtx: EnvContext) {
        super(envCtx);
        this.repoOpenSource = new RepositoryOpenSource(envCtx);
    }

    static instance(envCtx: EnvContext) {
        return super.getInstance.call(this, envCtx) as OpenSourceService;
    }

    async findAll() {
        try {
            return await this.repoOpenSource!.findAll();

        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async create(openSourceCreateDto: OpenSourceDto) {

        try {
            await this.repoOpenSource!.create(openSourceCreateDto);

            return `create new open source successfuly.`;
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async update(id: string, openSourceUpdateDto: OpenSourceDto) {
        try {
            return await this.repoOpenSource!.update(id, openSourceUpdateDto);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async findOne(id: string) {
        try {
            return await this.repoOpenSource!.findOne(id);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async remove(id: string) {
        try {
            return await this.repoOpenSource!.remove([id]);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

}
