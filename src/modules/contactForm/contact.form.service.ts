import { HTTPException } from "hono/http-exception";
import { BaseService } from "../../core/base.service";
import { EnvContext } from "../../core/context";
import { ContactFormDto } from "./dto/contact.form.dto";
import { ContactFormRepository } from "./contact.form.repository";
import { sendTelegramMessage } from "./contact.form.controller";


export class ContactFormService extends BaseService {

    private repoContactForm !: ContactFormRepository

    constructor(envCtx: EnvContext) {
        super(envCtx);
        this.repoContactForm = new ContactFormRepository(envCtx);
    }

    static instance(envCtx: EnvContext) {
        return super.getInstance.call(this, envCtx) as ContactFormService;
    }

    async findAll() {
        try {
            return await this.repoContactForm.findAll();

        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async findOne(id: string) {
        try {
            return await this.repoContactForm.findOne<ContactFormDto>(id);
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async create(contactFormDto: ContactFormDto) {
        try {

            const message = `
<b>🚀 New Inquiry Received</b>
━━━━━━━━━━━━━━━━━━

👤 <b>Name</b>:
${contactFormDto.name}

🆔 <b>Username</b>:
aldo123

📧 <b>Email</b>:
${contactFormDto.email}

💬 <b>Message</b>:
<i>${contactFormDto.message}</i>

━━━━━━━━━━━━━━━━━━
🕒 <b>Time:</b> ${new Date().toLocaleString()}
`;
            await sendTelegramMessage({
                chatId: "8789780372",
                message,
                env: this.ctx
            });
            await this.repoContactForm.create(contactFormDto);
            return `create new contact form successfuly.`;
        } catch (err: any) {
            console.log(err);
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async update(id: string, contactFormDto: ContactFormDto) {
        try {
            await this.repoContactForm.update(id, contactFormDto);
            return `update contact form succesfuly.`
        } catch (err: any) {
            throw new HTTPException(400, { message: `${err.message}` })
        }
    }

    async remove(id: string) {
        try {
            await this.repoContactForm.remove([id]);
            return `delete contact form id : ${id} succesfully. `;

        } catch (err: any) {
            throw new HTTPException(400, { message: err?.message })
        }
    }
}