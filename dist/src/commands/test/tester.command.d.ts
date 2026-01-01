import { CommandRunner } from 'nest-commander';
import { PrismaService } from '../../clients/prisma/prisma.service';
export declare class TesterCommand extends CommandRunner {
    private readonly prisma;
    constructor(prisma: PrismaService);
    teset(): Promise<void>;
    run(): Promise<void>;
}
