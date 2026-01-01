"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    database: {
        url: process.env.DATABASE_URL || '',
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD || undefined,
        db: parseInt(process.env.REDIS_DB || '0', 10),
    },
});
//# sourceMappingURL=configuration.js.map