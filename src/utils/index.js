export const getHashParams = (string, key) => {
    const matches = string.match(new RegExp(key + '=([^&]*)'));
    return matches ? matches[1] : null;
}