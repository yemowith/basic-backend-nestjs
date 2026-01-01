"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expireIn = expireIn;
exports.Cacheable = Cacheable;
const common_1 = require("@nestjs/common");
function expireIn(duration) {
    const now = Date.now();
    const match = duration.match(/^(\d+)([smhd])$/);
    if (!match)
        throw new Error('Invalid duration format');
    const value = parseInt(match[1], 10);
    const unit = match[2];
    let ms = 0;
    switch (unit) {
        case 's':
            ms = value * 1000;
            break;
        case 'm':
            ms = value * 60 * 1000;
            break;
        case 'h':
            ms = value * 60 * 60 * 1000;
            break;
        case 'd':
            ms = value * 24 * 60 * 60 * 1000;
            break;
        default:
            throw new Error('Invalid duration unit');
    }
    return new Date(now + ms);
}
function Cacheable(options) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const cacheService = this.cacheService;
            if (!cacheService) {
                throw new Error('CacheService not found on class instance.');
            }
            const key = typeof options.key === 'function' ? options.key(...args) : options.key;
            const expire = typeof options.expire === 'function'
                ? options.expire(...args)
                : options.expire;
            const cached = await cacheService.get(key);
            if (cached !== null && cached !== undefined) {
                return cached;
            }
            const result = await originalMethod.apply(this, args);
            await cacheService.set(key, result, expire);
            return result;
        };
        (0, common_1.SetMetadata)('cacheable', options)(descriptor.value);
        return descriptor;
    };
}
//# sourceMappingURL=cache.decorator.js.map