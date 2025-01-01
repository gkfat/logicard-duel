import { AccountController } from 'controller/account';
import { Hono } from 'hono';
import { getClient } from 'infra/db';

export async function initHono() {
    const app = new Hono();

    app.use('*', async (c, next) => {
        const client = getClient(c);

        c.set('$prisma', client);

        await next();

        await client.$disconnect();
    })

    // install routes
    new AccountController(app);

    return app;
}
