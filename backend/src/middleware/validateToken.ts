import jsonwebtoken from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function validateToken(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.headers.authorization)
            return res.status(401).json({ error: 'No token provided.' });
        const token = req.headers.authorization.split(' ')[1];
        jsonwebtoken.verify(token, process.env.JWT_SECRET as string, (err) => {
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
