import "dotenv-safe/config";
import { sign, SignOptions, verify } from "jsonwebtoken";

const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;

// eslint-disable-next-line @typescript-eslint/ban-types
export function signJwt(object: Object, options?: SignOptions | undefined) {
    return sign(object, privateKey, {
        ...(options && options),
        algorithm: "RS256",
    });
}

export function verifyJwt(token: string) {
    try {
        const payload = verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            payload,
        };
    } catch (error) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            payload: null,
        };
    }
}
