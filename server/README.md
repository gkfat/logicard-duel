# Logicard duel server

Build with Hono & cloudflare worker & D1 database.

## Env

## generate prisma client

```sh
pnpm prisma:generate
```

## prisma migration db

```sh
npx prisma migrate dev
```

## Deploy

```sh
npx wrangler deploy
```