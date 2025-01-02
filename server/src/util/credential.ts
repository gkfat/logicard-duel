import bcrypt from 'bcrypt';
import type { Auth } from 'types/auth';

/** 密碼組成規則: 6~10 位英數字 */
const REGEX_PASSWORD = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;

export function hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
}

export function verifyPassword(input: string, hashedPassword: string) {
    return bcrypt.compareSync(input, hashedPassword);
}

export function verifyPasswordLogin(inputAuth: Auth.LoginRequest, dbAuth: Auth.AuthDto) {
    if (!dbAuth.identifier || !inputAuth.email || !inputAuth.password) {
        return false;
    }

    const validIdentifier = dbAuth.identifier === inputAuth.email;
    const validCredential = verifyPassword(inputAuth.password, dbAuth.credential);

    return validIdentifier && validCredential;
}