import { Hono } from "hono";
import { create, findAll, findOne, findOneBySlug, remove, update } from "./project.controller";
import { projectCreateValidator, projectUpdateValidator } from "./project.validator";
import { ProjectService } from "./project.service";
import { baseErrorResponse } from "../../core/base.reponse";

type ProjectVariables = {
    projectService: ProjectService
}

const project = new Hono<{ Variables: ProjectVariables }>().basePath('/projects');

project.use(async (c, next) => {
    c.set('projectService', ProjectService.instance(c.env as any))
    await next()
})

project.post('/', projectCreateValidator, (c) => create(c, c.get('projectService')));
project.patch('/:id', projectUpdateValidator, (c) => update(c, c.get('projectService')));

project.get('/', (c) => findAll(c, c.get('projectService')));
project.get('/:id', (c) => findOne(c, c.get('projectService')));
project.get('/slug/:slug', (c) => findOneBySlug(c, c.get('projectService')));
project.delete('/:id', (c) => remove(c, c.get('projectService')));

project.onError((err: any, c) => {
    const status = err?.status;
    c.status(status ?? 400);
    return c.json(
        baseErrorResponse({ errors: err.message })
    )
})

export default project;
