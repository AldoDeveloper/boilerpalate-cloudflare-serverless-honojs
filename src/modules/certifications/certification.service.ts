import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { BaseService } from "../../core/base.service";
import { RepositoryCertification } from "./certification.repository";
import { CertificationDto } from "./dto/certification.dto";

export class CertificationService extends BaseService {

    private repoCertification: RepositoryCertification | null = null;

    constructor(envCtx: EnvContext) {
        super(envCtx);
        this.repoCertification = new RepositoryCertification(envCtx);
    }

    static instance(envCtx: EnvContext) {
        return super.getInstance.call(this, envCtx) as CertificationService;
    }

    async findAll() {
        try {
            return await this.repoCertification!.findAll();

        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async create(certificationCreateDto: CertificationDto) {

        try {
            await this.repoCertification!.create(certificationCreateDto);

            return `create new certification successfuly.`;
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async update(id: string, certificationUpdateDto: CertificationDto) {
        try {
            return await this.repoCertification!.update(id, certificationUpdateDto);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async findOne(id: string) {
        try {
            return await this.repoCertification!.findOne(id);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async remove(id: string) {
        try {
            return await this.repoCertification!.remove([id]);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

}
