import { EnumLoginType } from 'enum';
import type { Context } from 'hono';
import type { Account } from 'types/account';
import type { Auth } from 'types/auth';
import { verifyPasswordLogin } from 'util/credential';
import { getBase64Uuid } from 'util/uuid';

import type { PrismaClient } from '@prisma/client';

import oauthService from './oauth';

class AuthService {
    async loginOrCreate(ctx: Context, reqBody: Auth.LoginRequest) {
        let id: number | null = null;
        const prisma = ctx.get('$prisma') as PrismaClient;

        const {
            type,
            email,
        } = reqBody;
    
        if (type === EnumLoginType.PASSWORD) {
            const findAuth = await prisma.accountAuth.findFirst({
                where: {
                    type,
                    identifier: email
                }
            })
    
            if (!findAuth) {
                throw new Error('Invalid email or password') 
            }
    
            const validLogin = verifyPasswordLogin(reqBody, findAuth)
    
            if (!validLogin) {
                throw new Error('Invalid email or password') 
            }
    
            id = findAuth.account_id
        }
        // 第三方登入
        else {
            if (!oauthService[type]) {
                throw new Error(`Unsupported login type ${type}`)
            }

            const oauthResult = await oauthService[type](ctx, reqBody);

            if (!oauthResult) {
                throw new Error('Oauth login fail')
            }

            const findAuth = await prisma.accountAuth.findFirst({
                where: {
                    type,
                    identifier: oauthResult.identifier,
                },
            })

            if (!findAuth) {
                const newAccount = await prisma.account.create({
                    data: {
                        email: oauthResult.email,
                        name: oauthResult.name,
                        enabled: true,
                        auths: {
                            create: [{
                                type,
                                identifier: oauthResult.identifier,
                                credential: oauthResult.credential
                            }]
                        }
                    }
                })

                id = newAccount.id
            } else {
                id = findAuth.account_id
            }
        }

        await prisma.account.update({
            where: { id },
            data: {
                last_login_at: new Date()
            }
        })

        return {id}
    }

    async generateJwt(account: Account.AccountDto) {
        const payload: ITokenPayload = {
            scope: {
                sub: account.id,
                email: account.email,
                name: account.name,
            },
        };

        const jti = getBase64Uuid();

        const secret = this.configService.get('JWT_SECRET');
        const expiresIn = this.configService.get('JWT_EXPIRES_IN') || '1d';

        const token = await this.jwtService.signAsync(payload, {
            jwtid: jti, secret, expiresIn, algorithm: 'HS256', 
        });

        const ttl = ms(expiresIn);

        await this.cacheService.deleteValue(`token:${account.id}`);
        await this.cacheService.setValue(`token:${account.id}`, jti, ttl);

        return token;
    }
}

export default new AuthService()