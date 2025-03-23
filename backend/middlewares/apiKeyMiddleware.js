const apiKeyMiddleware = (req, res, next) => {
    const userKey = req.header("x-api-key"); // Read from headers
    if (!userKey || userKey !== process.env.API_KEY) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
};

module.exports = apiKeyMiddleware;