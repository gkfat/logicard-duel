import { PrismaClient } from '@prisma/client';

import { EnumLoginType } from '../src/enum/login-type.enum';
import { EnumRole } from '../src/enum/role.enum';
import { hashPassword } from '../src/util/credential';

const prisma = new PrismaClient()

async function main() {
    await prisma.role.upsert({
        where: { role: EnumRole.SUPER },
        update: {},
        create: { role: EnumRole.SUPER }
    })

    await prisma.role.upsert({
        where: { role: EnumRole.MEMBER },
        update: {},
        create: { role: EnumRole.MEMBER }
    })

    const email = process.env.APP_ROOT_EMAIL ?? 'super@logicarduel.com'
    const password = process.env.APP_ROOT_PASSWORD ? hashPassword(process.env.APP_ROOT_PASSWORD) : hashPassword('super')
    
    await prisma.account.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: 'super',
            enabled: true,
            auths: {
                create: {
                    type: EnumLoginType.PASSWORD,
                    identifier: email,
                    credential: password
                }
            },
            roles: {
                connect: {
                    role: EnumRole.SUPER
                }
            }
        }
    })
}

main()
.then(async() => {
    await prisma.$disconnect()
})
.catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()
    process.exit(1)
})