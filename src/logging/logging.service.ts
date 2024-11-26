import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggingService extends ConsoleLogger {
  private static readonly LOG_DIR = path.resolve(__dirname, '../../logs');
  private static readonly LOG_FILE = path.join(
    LoggingService.LOG_DIR,
    'app.log',
  );
  private static readonly ERROR_LOG_FILE = path.join(
    LoggingService.LOG_DIR,
    'error.log',
  );

  private static maxFileSize: number;
  private static logLevel: number;

  constructor(private readonly configService: ConfigService) {
    super();
    this.ensureLogDirectory();
    this.initializeConfig();
  }

  private ensureLogDirectory(): void {
    if (!fs.existsSync(LoggingService.LOG_DIR)) {
      fs.mkdirSync(LoggingService.LOG_DIR, { recursive: true });
    }
  }

  private initializeConfig(): void {
    if (!LoggingService.maxFileSize) {
      LoggingService.maxFileSize =
        parseInt(this.configService.get<string>('LOG_MAX_SIZE_KB') || '51200') *
        1024;
      LoggingService.logLevel = this.mapLogLevel(
        this.configService.get<string>('LOG_LEVEL') || 'log',
      );
    }
  }

  private mapLogLevel(level: string): number {
    const levels: Record<string, number> = {
      error: 0,
      warn: 1,
      log: 2,
      debug: 3,
      verbose: 4,
    };
    return levels[level.toLowerCase()] ?? 2;
  }

  private shouldLog(level: number): boolean {
    return LoggingService.logLevel >= level;
  }

  private logToFile(level: string, message: string, filePath: string): void {
    const timestamp = new Date().toISOString();
    const formattedMessage = `${timestamp} [${level}] ${message}\n`;

    this.rotateFileIfNeeded(filePath);
    fs.appendFileSync(filePath, formattedMessage);
  }

  private rotateFileIfNeeded(filePath: string): void {
    if (
      fs.existsSync(filePath) &&
      fs.statSync(filePath).size >= LoggingService.maxFileSize
    ) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      fs.renameSync(filePath, `${filePath}.${timestamp}`);
    }
  }

  log(message: any, context?: string): void {
    if (this.shouldLog(2)) {
      super.log(message, context);
      this.logToFile('LOG', message, LoggingService.LOG_FILE);
    }
  }

  error(message: any, trace?: string, context?: string): void {
    if (this.shouldLog(0)) {
      super.error(message, trace, context);
      this.logToFile(
        'ERROR',
        `${message}${trace ? ` - ${trace}` : ''}`,
        LoggingService.ERROR_LOG_FILE,
      );
    }
  }

  warn(message: any, context?: string): void {
    if (this.shouldLog(1)) {
      super.warn(message, context);
      this.logToFile('WARN', message, LoggingService.LOG_FILE);
    }
  }

  debug(message: any, context?: string): void {
    if (this.shouldLog(3)) {
      super.debug(message, context);
      this.logToFile('DEBUG', message, LoggingService.LOG_FILE);
    }
  }

  verbose(message: any, context?: string): void {
    if (this.shouldLog(4)) {
      super.verbose(message, context);
      this.logToFile('VERBOSE', message, LoggingService.LOG_FILE);
    }
  }
}
