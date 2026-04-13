import { HTTPException } from "hono/http-exception";
import { EnvContext } from "../../core/context";
import { BaseService } from "../../core/base.service";
import { RepositoryContact } from "./contact.repository";
import { ContactDto } from "./dto/contact.dto";

export class ContactService extends BaseService {

    private repoContact: RepositoryContact | null = null;

    constructor(envCtx: EnvContext) {
        super(envCtx);
        this.repoContact = new RepositoryContact(envCtx);
    }

    static instance(envCtx: EnvContext) {
        return super.getInstance.call(this, envCtx) as ContactService;
    }

    async findAll() {
        try {
            return await this.repoContact!.findAll();

        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async create(contactCreateDto: ContactDto) {

        try {
            await this.repoContact!.create(contactCreateDto);

            return `create new contact successfuly.`;
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async update(id: string, contactUpdateDto: ContactDto) {
        try {
            return await this.repoContact!.update(id, contactUpdateDto);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async findOne(id: string) {
        try {
            return await this.repoContact!.findOne(id);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async remove(id: string) {
        try {
            return await this.repoContact!.remove([id]);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

}
