import type { Context } from 'hono';

import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';

export const getClient = (ctx: Context) => {
    const adapter = new PrismaD1(ctx.env.DB)
    
    const client = new PrismaClient({adapter})

    return client
}