import { Hono } from 'hono'
import module from './modules/module';
import { logger } from 'hono/logger';
import botTL from './modules/botTelegram/route';
// import { rateLimiter } from './middleware/ratelimit.middleware';

const app = new Hono<{Bindings : Cloudflare.Env }>();

app.use(logger());
// app.use(rateLimiter(1000, 60)); //limit 1000 request per minute

app.route('/', module);

app.route('/tele', botTL);

export default app;
