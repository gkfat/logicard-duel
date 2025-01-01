export function encodeToBase64(input: string) {
    // UTF-8 編碼
    const encodedString = encodeURIComponent(input);

    // base64 編碼
    return btoa(encodedString);
}
