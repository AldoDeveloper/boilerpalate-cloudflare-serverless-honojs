
export interface IFileImage{
    file_name ?: string;
    file : File;
    formatType: "image/webp" | "image/jpeg" | "image/png" | "image/gif" | "image/avif" | "rgb" | "rgba";
    width ?: number;
    height ?: number;
    rotate ?: 0 | 90 | 180 | 270 | undefined
}

export class FileImageDto implements IFileImage {
    file_name?: string;
    formatType !: "image/webp" | "image/jpeg" | "image/png" | "image/gif" | "image/avif" | "rgb" | "rgba";
    file!: File;
    width ?: number;
    height ?: number;
    rotate?: 0 | 90 | 180 | 270 | undefined
}