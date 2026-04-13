import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { BaseService } from "../../core/base.service";
import { RepositoryEducation } from "./education.repository";
import { EducationDto } from "./dto/education.dto";

export class EducationService extends BaseService {

    private repoEducation: RepositoryEducation | null = null;

    constructor(envCtx: EnvContext) {
        super(envCtx);
        this.repoEducation = new RepositoryEducation(envCtx);
    }

    static instance(envCtx: EnvContext) {
        return super.getInstance.call(this, envCtx) as EducationService;
    }

    async findAll() {
        try {
            return await this.repoEducation!.findAll();

        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async create(educationCreateDto: EducationDto) {

        try {
            await this.repoEducation!.create(educationCreateDto);

            return `create new education successfuly.`;
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async createMany(educationCreateDtos: EducationDto[]) {
        try {
            await this.repoEducation!.createMany(educationCreateDtos);

            return `create many educations successfuly.`;
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async update(id: string, educationUpdateDto: EducationDto) {
        try {
            return await this.repoEducation!.update(id, educationUpdateDto);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async findOne(id: string) {
        try {
            return await this.repoEducation!.findOne(id);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async remove(id: string) {
        try {
            return await this.repoEducation!.remove([id]);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

}
