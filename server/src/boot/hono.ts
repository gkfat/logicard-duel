import { RankController } from 'controller/rank';
import { Hono } from 'hono';
import { getDbClient } from 'infra/db';

export async function initHono() {
    const app = new Hono();

    app.use('*', async (c, next) => {
        c.header('Access-Control-Allow-Origin', '*');
        c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
        if (c.req.method === 'OPTIONS') {
            return c.text('', 204);
        }
    
        return next();
    })

    app.use('*', async (c, next) => {
        const db = getDbClient(c);

        c.set('$prisma', db);

        await next();

        await db.$disconnect();
    })

    // install routes
    new RankController(app);

    return app;
}
