import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { BaseService } from "../../core/base.service";
import { RepositoryArticle } from "./article.repository";
import { ArticleDto } from "./dto/article.dto";

export class ArticleService extends BaseService {

    private repoArticle: RepositoryArticle | null = null;

    constructor(envCtx: EnvContext) {
        super(envCtx);
        this.repoArticle = new RepositoryArticle(envCtx);
    }

    static instance(envCtx: EnvContext) {
        return super.getInstance.call(this, envCtx) as ArticleService;
    }

    async findAll() {
        try {
            return await this.repoArticle!.findAll();

        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async create(articleCreateDto: ArticleDto) {

        try {
            await this.repoArticle!.create(articleCreateDto);

            return `create new article successfuly.`;
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async update(id: string, articleUpdateDto: ArticleDto) {
        try {
            return await this.repoArticle!.update(id, articleUpdateDto);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async findOne(id: string) {
        try {
            return await this.repoArticle!.findOne(id);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async findOneBySlug(slug: string) {
        try {
            return await this.repoArticle!.findOneBySlug(slug);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async remove(id: string) {
        try {
            return await this.repoArticle!.remove([id]);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

}
