import type {
  Context,
  Hono,
} from 'hono';

import type { PrismaClient } from '@prisma/client';

export class AccountController {
    constructor(app:Hono) {
        app.get('/accounts', this.listAccounts)
    }

    async listAccounts(ctx: Context) {
        try {
            const prisma = ctx.get('$prisma') as PrismaClient;
            const accounts = await prisma.account.findMany()
        
            return ctx.json(accounts)
        } catch(error) {
            console.error('Error fetching accounts: ', error)
            throw error;
        }
    }
}
