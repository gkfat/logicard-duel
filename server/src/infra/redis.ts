import type { Context } from 'hono';

import { Redis } from '@upstash/redis';

export const getRedis = (ctx: Context) => {
    return Redis.fromEnv(ctx.env)
}