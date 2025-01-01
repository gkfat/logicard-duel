import type { Auth } from './auth';

export namespace Account {
    export interface AccountDto {
        id: number;
        email: string;
        name: string;
        enabled: boolean;
        last_login_at: Date;
        created_at: Date;
        auths: Auth.AuthDto[];
    }
}
