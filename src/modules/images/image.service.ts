import { HTTPException } from "hono/http-exception";
import { BaseService } from "../../core/base.service";
import { EnvContext } from "../../core/context";
import { FileImageDto } from "./dto/image.options.dto";


export class ImageService extends BaseService{

    constructor(envCtx: EnvContext) {
        super(envCtx)
    }   

    static instance(envCtx: EnvContext) {
        return super.getInstance.call(this, envCtx) as ImageService;
    }

    async options({ file, file_name, formatType, ...transform }: FileImageDto) {
        try{
            const stream_file = file.stream();

            const width  = transform.width  ? parseFloat(transform.width  as any) : undefined;
            const height = transform.height ? parseFloat(transform.height as any) : undefined;
            const rotate = transform.rotate ? parseFloat(transform.rotate as any) : undefined;

            const imageOption = await this.ctx.IMAGES
                .input(stream_file)
                .transform({ width, height, rotate: rotate as any })
                .output({ format: formatType });

            return imageOption.response();

        }catch(err: any){
            throw new HTTPException(400, { message: err.message })
        }
    }
}