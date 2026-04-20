import { Context } from "hono";
import { ProjectService } from "./project.service";
import { baseResponse } from "../../core/base.reponse";
import { HttpStatusMap } from "../../core/http.error.code";
import { ProjectDto } from "./dto/project.dto";

export const findAll = async (ctx: Context, projectService: ProjectService) => {

    const results = await projectService.findAll();
    return ctx.json(
        baseResponse({ data: results })
    );
};

export const create = async (ctx: Context, projectService: ProjectService) => {

    const body = ctx.get('mapBody') as ProjectDto;
    const result = await projectService.create(body);

    ctx.status(201);
    return ctx.json(
        baseResponse({ data: result, message: HttpStatusMap[201] })
    );
}

export const findOne = async (ctx: Context, projectService: ProjectService) => {

    const { id } = ctx.req.param();
    const result = await projectService.findOne(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const findOneBySlug = async (ctx: Context, projectService: ProjectService) => {

    const { slug } = ctx.req.param();
    const result = await projectService.findOneBySlug(slug);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const remove = async (ctx: Context, projectService: ProjectService) => {
    const { id } = ctx.req.param();
    const result = await projectService.remove(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const update = async (ctx: Context, projectService: ProjectService) => {
    const { id } = ctx.req.param();
    const body = ctx.get('mapBody') as ProjectDto;
    const result = await projectService.update(id, body);

    return ctx.json(
        baseResponse({ data: result })
    )
}
