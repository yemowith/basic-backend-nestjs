import { Module } from '@nestjs/common';
import { TesterCommand } from './test/tester.command';

@Module({
  providers: [TesterCommand],
})
export class CommandsModule {}
