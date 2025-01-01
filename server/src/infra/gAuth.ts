import { OAuth2Client } from 'google-auth-library';
import type { Context } from 'hono';

export async function getGAuthClient(ctx: Context) {
    const {
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        GOOGLE_REDIRECT_URI
    } = ctx.env;

    return new OAuth2Client({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        redirectUri: GOOGLE_REDIRECT_URI,
    })
}