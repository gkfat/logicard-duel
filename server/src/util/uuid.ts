import { v4 } from 'uuid';

export function getBase64Uuid() {
    return Buffer.from(v4()).toString('base64');
}