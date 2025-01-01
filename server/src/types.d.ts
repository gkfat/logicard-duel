import type { Context } from 'hono';

import type { PrismaClient } from '@prisma/client';

declare module 'hono' {
    interface Context {
        get(key: '$prisma'): PrismaClient;
        set(key: '$prisma', value: PrismaClient): void;
    }
}