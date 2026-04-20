import { Context, Next } from "hono";


export const mapBodyProject = async(c: Context, next: Next) => {
    const body = await c.req.json();
    const mapBody = {
        ...body,
        tech_stacks: body.tech_stacks ? JSON.stringify(body.tech_stacks) : null
    };

    c.set('mapBody', mapBody);
    await next();

}