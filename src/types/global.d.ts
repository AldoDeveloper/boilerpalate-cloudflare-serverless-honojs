
export {};

declare global{
    type Env = {
        api_cv_db : D1Database,
        BUCKET : R2Bucket,
        KV : KVNamespace,
    }
}