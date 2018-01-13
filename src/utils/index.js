export const getHashParams = (string, key) => {
    const matches = string.match(new RegExp(key + '=([^&]*)'));
    return matches ? matches[1] : null;
};

export const randomString = (length) => {
    const options = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let string = '';

    for (let i = 0; i < length; i++) {
        string += options.charAt(Math.floor(Math.random() * options.length));
    }

    return string;
};