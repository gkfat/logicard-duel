import type {
  Context,
  Hono,
} from 'hono';
import type { Auth } from 'types/auth';

import type { PrismaClient } from '@prisma/client';

import authService from '../service/auth';

export class AuthController {
    constructor(app:Hono) {
        app.post(
            '/auth',
            this.login
        )
    }

    async login(ctx: Context) {
        const reqBody = await ctx.req.json<Auth.LoginRequest>();

        const prisma = ctx.get('$prisma') as PrismaClient;
        const { id } = await authService.loginOrCreate(ctx, reqBody)

        const account = await prisma.account.findFirst({
            where: {
                id
            }
        })

        if (account) {
            if (!account.enabled) {
                throw new Error('Account has been frozen')
            }

            const token = await authService.generateJwt(account)

            ctx.json({
                account,
                token
            })
        }
    }
}
