import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { BaseService } from "../../core/base.service";
import { RepositoryAchievement } from "./achievement.repository";
import { AchievementDto } from "./dto/achievement.dto";

export class AchievementService extends BaseService {

    private repoAchievement: RepositoryAchievement | null = null;

    constructor(envCtx: EnvContext) {
        super(envCtx);
        this.repoAchievement = new RepositoryAchievement(envCtx);
    }

    static instance(envCtx: EnvContext) {
        return super.getInstance.call(this, envCtx) as AchievementService;
    }

    async findAll() {
        try {
            return await this.repoAchievement!.findAll();

        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async create(achievementCreateDto: AchievementDto) {

        try {
            await this.repoAchievement!.create(achievementCreateDto);

            return `create new achievement successfuly.`;
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async update(id: string, achievementUpdateDto: AchievementDto) {
        try {
            return await this.repoAchievement!.update(id, achievementUpdateDto);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async findOne(id: string) {
        try {
            return await this.repoAchievement!.findOne(id);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async remove(id: string) {
        try {
            return await this.repoAchievement!.remove([id]);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

}
