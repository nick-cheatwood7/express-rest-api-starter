export function base64Dencode(content: string): string {
    return Buffer.from(content, "base64").toString("binary");
}

export function base64Encode(content: string): string {
    return Buffer.from(content, "binary").toString("base64");
}
