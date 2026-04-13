import { Hono } from "hono";
import { fileImage } from "./image.controller";
import { ImageService } from "./image.service";
import { baseErrorResponse } from "../../core/base.reponse";

export type ImageVariable = {
    imageService: ImageService
};

const images = new Hono<{Bindings: Cloudflare.Env, Variables: ImageVariable }>().basePath('/images');

images.use(async(c, next) => {
   c.set('imageService', ImageService.instance(c.env));
   await next();
})

images.post('/', (c) => fileImage(c, c.get("imageService")));

images.onError((err: any, c) => {
    const status = err?.status ?? 400;
    c.status(status);

    return c.json(
        baseErrorResponse({ errors: [err.message]})
    )
})

export default images;