"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
const config_1 = require("@nestjs/config");
let CacheService = class CacheService {
    configService;
    redis;
    prefix = 'cache:';
    constructor(configService) {
        this.configService = configService;
        const redisConfig = this.configService.get('redis');
        this.prefix = redisConfig?.prefix || 'cache:';
        this.redis = new ioredis_1.default({
            host: redisConfig?.host || 'localhost',
            port: redisConfig?.port || 6379,
            password: redisConfig?.password || undefined,
            db: redisConfig?.db || 0,
        });
    }
    withPrefix(key) {
        return `${this.prefix}${key}`;
    }
    async set(key, value, expire) {
        let storeValue = value;
        let ttl;
        if (expire instanceof Date) {
            const seconds = Math.max(1, Math.floor((expire.getTime() - Date.now()) / 1000));
            storeValue = { value, _expire: expire.getTime() };
            ttl = seconds;
        }
        else {
            ttl = expire;
        }
        const stringValue = JSON.stringify(storeValue);
        const redisKey = this.withPrefix(key);
        await this.redis.set(redisKey, stringValue, 'EX', ttl);
    }
    async get(key) {
        const redisKey = this.withPrefix(key);
        const val = await this.redis.get(redisKey);
        if (val === null)
            return null;
        try {
            const parsed = JSON.parse(val);
            if (parsed && typeof parsed === 'object' && '_expire' in parsed) {
                if (typeof parsed._expire === 'number' && parsed._expire < Date.now()) {
                    await this.redis.del(redisKey);
                    return null;
                }
                return parsed.value;
            }
            return parsed;
        }
        catch {
            return null;
        }
    }
    async del(key) {
        const redisKey = this.withPrefix(key);
        await this.redis.del(redisKey);
    }
    async onModuleDestroy() {
        await this.redis.quit();
    }
};
exports.CacheService = CacheService;
exports.CacheService = CacheService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CacheService);
//# sourceMappingURL=cache.service.js.map