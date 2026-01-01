export interface CacheableOptions {
    key: string | ((...args: any[]) => string);
    expire: number | Date | ((...args: any[]) => number | Date);
}
export declare function expireIn(duration: string): Date;
export declare function Cacheable(options: CacheableOptions): MethodDecorator;
