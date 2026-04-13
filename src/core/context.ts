
export type EnvContext = Cloudflare.Env;

export const createEnvContext = (env: Cloudflare.Env) : EnvContext => {
    return{
        api_cv_db: env.api_cv_db,
        IMAGES: env.IMAGES,
        CLOUDFLARE_ACCOUNT_ID: env.CLOUDFLARE_ACCOUNT_ID
    }
}