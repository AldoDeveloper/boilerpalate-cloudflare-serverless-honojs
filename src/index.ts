import { Hono } from 'hono'
import module from './modules/module';
import { logger } from 'hono/logger';

const app = new Hono<{Bindings : Cloudflare.Env }>();
app.use(logger());

app.route('/', module);

app.post('/upload', async(c) => {

    const formData = await c.req.formData();
    const file = formData.get("image") as File;

    const imageStream = file.stream(); 
    
    const imgResponse = await c.env.IMAGES
      .input(imageStream)
      .transform({ width: 250, height: 250 }).output({ 
        format: 'image/png'
    });
 
    return imgResponse.response();
    
});

export default app
