import { Command, CommandRunner } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../clients/prisma/prisma.service';

@Injectable()
@Command({
  name: 'test:tester',
  description: 'Seed the database with initial data',
})
export class TesterCommand extends CommandRunner {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async teset() {
    console.log('test');
  }

  async run(): Promise<void> {
    try {
      await this.teset();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
