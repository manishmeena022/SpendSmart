const getTokenFromHeader = (req) => {
    if (!req.headers || !req.headers.authorization) {
        return {
            status: 'failed',
            message: 'Authorization header is missing'
        };
    }

    const tokenParts = req.headers.authorization.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
        return {
            status: 'failed',
            message: 'Invalid authorization format. Use "Bearer token"'
        };
    }

    const token = tokenParts[1];
    return token;
};

export { getTokenFromHeader };
