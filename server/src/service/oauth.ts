import type { Context } from 'hono';
import { getGAuthClient } from 'infra/gAuth';
import type { Auth } from 'types/auth';

class OAuthService {
    async google(ctx: Context, reqBody: Auth.LoginRequest) {
        const gAuthClient = await getGAuthClient(ctx);
        const {code} = reqBody;

        try {
            const {tokens} = await gAuthClient.getToken(code)
            gAuthClient.setCredentials(tokens)

            const idToken = tokens.id_token;

            const ticket = await gAuthClient.verifyIdToken({
                idToken,
                audience: gAuthClient._clientId,
            })

            const userInfo = ticket.getPayload()

            if (userInfo) {
                return {
                    email: userInfo.email,
                    name: userInfo.name,
                    identifier: userInfo.sub,
                    credential: null,
                }
            }

        } catch(err) {
            console.error('Google login fail: ', err)
        }

        return null;
    }
}

export default new OAuthService()