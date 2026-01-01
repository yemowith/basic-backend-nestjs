import { OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class CacheService implements OnModuleDestroy {
    private readonly configService;
    private readonly redis;
    private readonly prefix;
    constructor(configService: ConfigService);
    private withPrefix;
    set(key: string, value: any, expire: number | Date): Promise<void>;
    get<T = any>(key: string): Promise<T | null>;
    del(key: string): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
