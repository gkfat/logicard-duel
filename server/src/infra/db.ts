import type { Context } from 'hono';

import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';

export const getDbClient = (ctx: Context) => {
    return new PrismaClient({
        adapter: new PrismaD1(ctx.env.DB),
    })
}