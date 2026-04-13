import { Context } from "hono";
import { ImageService } from "./image.service";
import { FileImageDto } from "./dto/image.options.dto";

export const fileImage = async(ctx: Context, imageService: ImageService) => {
    
    const formData   = await ctx.req.formData(); 
    const objectData = Object.fromEntries(formData.entries() as any) as FileImageDto;

    console.log(objectData);
    return await imageService.options(objectData);
}