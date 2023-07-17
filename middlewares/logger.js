const logger = (req, res, next) => {
    const { method, url, ip } = req;

    console.log(
        `[${new Date().toISOString()}] Effetuata richiesta ${method} all'ednpoint ${url} da ip ${ip}`
    );
    next();
};

module.exports = logger;