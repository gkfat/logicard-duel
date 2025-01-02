import type {
  Context,
  Hono,
} from 'hono';

import type { PrismaClient } from '@prisma/client';

export class RankController {
    constructor(app:Hono) {
        app.get('/ranks', this.getRanks)
        app.post('/ranks/create', this.createRank)
    }

    async getRanks(ctx: Context) {
        const prisma = ctx.get('$prisma') as PrismaClient;
        const ranks = await prisma.rank.findMany()

        return ctx.json(ranks)
    }

    async createRank(ctx: Context) {
        const reqBody = await ctx.req.json<{
            end_date: string;
            player_name: string;
            player: JSON;
            last_words: string;
        }>();

        const prisma = ctx.get('$prisma') as PrismaClient;
        const res = await prisma.rank.create({
            data: reqBody,
        })

        return ctx.json(res)
    }
}
