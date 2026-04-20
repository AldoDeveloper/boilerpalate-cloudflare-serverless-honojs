import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { BaseService } from "../../core/base.service";
import { RepositoryProject } from "./project.repository";
import { ProjectDto } from "./dto/project.dto";

export class ProjectService extends BaseService {

    private repoProject: RepositoryProject | null = null;

    constructor(envCtx: EnvContext) {
        super(envCtx);
        this.repoProject = new RepositoryProject(envCtx);
    }

    static instance(envCtx: EnvContext) {
        return super.getInstance.call(this, envCtx) as ProjectService;
    }

    async findAll() {
        try {
            const projects = await this.repoProject!.findAll<ProjectDto[]>();
            return projects.map(p => ({
                ...p,
                tech_stacks: p.tech_stacks ? JSON.parse(p.tech_stacks) : []
            }))

        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async create(projectCreateDto: ProjectDto) {

        try {
            await this.repoProject!.create(projectCreateDto);
            return `create new project successfuly.`;
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async update(id: string, projectUpdateDto: ProjectDto) {
        try {
            return await this.repoProject!.update(id, projectUpdateDto);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async findOne(id: string) {
        try {
            const project = await this.repoProject!.findOne<ProjectDto>(id);

            if (project) {
                return {
                    ...project,
                    tech_stacks: project.tech_stacks ? JSON.parse(project.tech_stacks) : []
                }
            }
            
            return null;
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async findOneBySlug(slug: string) {
        try {
            return await this.repoProject!.findOneBySlug(slug);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async remove(id: string) {
        try {
            return await this.repoProject!.remove([id]);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

}
