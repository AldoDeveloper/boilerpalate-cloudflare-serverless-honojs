import { Context, Next } from "hono";
import { rateLimitKV } from "../core/rate.limiter";
import { HTTPException } from "hono/http-exception";
import { baseErrorResponse } from "../core/base.reponse";

export const rateLimiter = (limit = 100, window = 60) => {
    return async (c: Context<{ Bindings: Cloudflare.Env }>, next: Next) => {

        try {
            const ip =
                c.req.header("cf-connecting-ip") ||
                c.req.header("x-forwarded-for") ||
                "anonymous";

            const key = `rate:${ip}:${c.req.path}`;

            const result = await rateLimitKV(c.env, key, limit, window);

            if (!result.success) {
                return c.json(
                    baseErrorResponse({
                        errors: ["to many large"]
                    }),
                    429
                );
            }

            return next();

        } catch (err: any) {
            return c.json(
                baseErrorResponse({
                    errors: [err.message]
                }),
                429
            );
        }
    };
};