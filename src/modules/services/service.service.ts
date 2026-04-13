import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { BaseService } from "../../core/base.service";
import { RepositoryService } from "./service.repository";
import { ServiceDto } from "./dto/service.dto";

export class ServiceService extends BaseService {

    private repoService: RepositoryService | null = null;

    constructor(envCtx: EnvContext) {
        super(envCtx);
        this.repoService = new RepositoryService(envCtx);
    }

    static instance(envCtx: EnvContext) {
        return super.getInstance.call(this, envCtx) as ServiceService;
    }

    async findAll() {
        try {
            return await this.repoService!.findAll();

        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async create(serviceCreateDto: ServiceDto) {

        try {
            await this.repoService!.create(serviceCreateDto);

            return `create new service successfuly.`;
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async update(id: string, serviceUpdateDto: ServiceDto) {
        try {
            return await this.repoService!.update(id, serviceUpdateDto);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async findOne(id: string) {
        try {
            return await this.repoService!.findOne(id);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async remove(id: string) {
        try {
            return await this.repoService!.remove([id]);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

}
