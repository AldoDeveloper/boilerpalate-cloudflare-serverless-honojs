import { Hono } from "hono";
import { sendTelegramMessage } from "../contactForm/contact.form.controller";

const botTL = new Hono<{ Bindings: Cloudflare.Env }>();

botTL.get('/', async (c) => {
    return c.text('OK', 200)
})

botTL.post('/webhook', async (c) => {

    const body = await c.req.json();
    const message = body.message;

    if (!message) return c.text('ok');

    const chatId = message.chat.id;
    const text = message.text as string;

    if (text?.startsWith('/start')) {
        await sendTelegramMessage({
            chatId,
            message: "Halo! Saya bot AI Anda 🤖",
            env: c.env as any
        });

        return c.text('OK', 200)
    }

    await sendTelegramMessage(
        {
            chatId,
            message: "More Then This",
            env: c.env as any
        }
    )
    return c.text('ok')

});

export default botTL;