import { Global, Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  providers: [LoggingService],
  imports: [ConfigModule],
  exports: [LoggingService],
})
export class LoggingModule {}
