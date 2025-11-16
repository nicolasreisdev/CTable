import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth'; 

export default (request: Request, response: Response, next: NextFunction) => {
    
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ error: 'Token não fornecido.' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return response.status(401).json({ error: 'Token em formato inválido.' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return response.status(401).json({ error: 'Token mal formatado.' });
    }

    try {
        const decoded = jwt.verify(token, authConfig.secret) as { id: number, username: string };
        
        request.user = {
            id: decoded.id,
            username: decoded.username
        };

        return next();

    } catch (err) {
        return response.status(401).json({ error: 'Token inválido.' });
    }
};