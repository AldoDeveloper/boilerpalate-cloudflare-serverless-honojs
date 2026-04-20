export class ProjectDto {
    id!: string;
    title!: string;
    slug!: string;
    description!: string;
    content_md!: string;
    thumbnail_url!: string;
    demo_url!: string;
    tech_stacks!: string; // comma-separated list of technologies used in the project save JSON array
    repo_url!: string;
}
