import { Context } from "hono";
import { ContactFormService } from "./contact.form.service";
import { baseResponse } from "../../core/base.reponse";


export interface ITelegramOption{
    chatId?: string;
    message: string;
    env: Cloudflare.Env,
}

export async function sendTelegramMessage({ chatId, message, env } : ITelegramOption) {
  const url = `https://api.telegram.org/bot8553716523:AAF5tZR0itgEIJM7bmLzdR5P99AeX2b4wAU/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML"
    })
  });
}

export const findAll = async(ctx: Context, contactFormService: ContactFormService) => {

    const result = await contactFormService.findAll();
    return ctx.json(
        baseResponse({data: result })
    )
}

export const findOne  = async(ctx: Context, contactFormService: ContactFormService) => {
    const { id } = ctx.req.param()
    const result = await contactFormService.findOne(id);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const create  = async(ctx: Context, contactFormService: ContactFormService) => {
    const body = await ctx.req.json();
    const result = await contactFormService.create(body);

    ctx.status(201)
    return ctx.json(
        baseResponse({ data: result })
    )
}

export const update  = async(ctx: Context, contactFormService: ContactFormService) => {
    const { id } = ctx.req.param();
    const body = await ctx.req.json();
    const result = await contactFormService.update(id, body);

    return ctx.json(
        baseResponse({ data: result })
    )
}

export const remove = async(ctx: Context, contactFormService: ContactFormService) => {
  const { id } = ctx.req.param();
  const result = await contactFormService.remove(id);

  return ctx.json(
    baseResponse({ data: result })
  )
}

