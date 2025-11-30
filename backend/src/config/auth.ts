export const authConfig = {
    secret: process.env.TOKEN_SECRET || 'dev-local',
    expiresIn: '1d',
} as const;