export class AchievementDto {
    id!: string;
    title!: string;
    description!: string;
    issuer!: string;
    date!: string;
    certificateUrl!: string;
    imageUrl!: string;
    category!: string;
    status!: 'verified' | 'pending' | 'in-progress';
}
