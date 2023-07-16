import jsonwebtoken from 'jsonwebtoken';

export function validateToken(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jsonwebtoken.verify(token, process.env.JWT_SECRET, (err) => {
            if (err)
                return res.status(401).json({
                    error: 'Token invalid or expired.',
                });

            return next();
        });
    } catch (error) {
        return res.status(401).json({
            error: 'No token provided.',
        });
    }
}
