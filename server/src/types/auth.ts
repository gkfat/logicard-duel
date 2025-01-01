import type { EnumLoginType } from 'enum';

export namespace Auth {
    export interface AuthDto {
        id: number;
        account_id: number;
        type: EnumLoginType;
        identifier: string;
        credential?: string;
    }

    export interface LoginRequest {
        type: EnumLoginType;
        email: string;
        password?: string;
        code?: string;
    };
}