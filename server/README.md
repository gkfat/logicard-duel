# Logicard duel server

Build with Hono & cloudflare worker & D1 database.

## Env

Prepare `.dev.vars` as local env file

## generate prisma client

```sh
pnpm prisma:generate
```

## prisma migration db

```sh
npx prisma migrate dev
```