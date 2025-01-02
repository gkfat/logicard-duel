import { AccountController } from 'controller/account';
import { Hono } from 'hono';
import { getDbClient } from 'infra/db';

export async function initHono() {
    const app = new Hono();

    app.use('*', async (c, next) => {
        const db = getDbClient(c);
        // const redis = getRedis(c)

        c.set('$prisma', db);
        // c.set('$redis', redis)

        await next();

        await db.$disconnect();
    })

    // install routes
    new AccountController(app);

    return app;
}
