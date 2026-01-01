declare const _default: () => {
    port: number;
    database: {
        url: string;
    };
    redis: {
        host: string;
        port: number;
        password: string | undefined;
        db: number;
    };
};
export default _default;
